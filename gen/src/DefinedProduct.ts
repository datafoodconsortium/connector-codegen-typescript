/*
 * MIT License
 * 
 * Copyright (c) 2023 Maxime Lecoq <maxime@lecoqlibre.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

import IProductType from "./IProductType.js"
import Quantifiable from "./Quantifiable.js"
import ICertification from "./ICertification.js"
import ICatalogItem from "./ICatalogItem.js"
import Claimable from "./Claimable.js"
import IPhysicalCharacteristic from "./IPhysicalCharacteristic.js"
import INatureOrigin from "./INatureOrigin.js"
import IPartOrigin from "./IPartOrigin.js"
import INutrientCharacteristic from "./INutrientCharacteristic.js"
import IGeographicalOrigin from "./IGeographicalOrigin.js"
import IAllergenCharacteristic from "./IAllergenCharacteristic.js"
import IDefinedProduct from "./IDefinedProduct.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import IConnector from "./IConnector.js";
import IGetterOptions from "./IGetterOptions.js"

export default abstract class DefinedProduct extends SemanticObject implements IDefinedProduct {
	
	protected connector: IConnector;

	protected constructor(parameters: {connector: IConnector, semanticId?: string, semanticType?: string, other?: Semanticable, name?: string, description?: string, productType?: (IProductType & Semanticable), quantity?: (Quantifiable & Semanticable), alcoholPercentage?: number, lifetime?: string, claims?: (Claimable & Semanticable)[], usageOrStorageConditions?: string, allergenCharacteristics?: (IAllergenCharacteristic & Semanticable)[], nutrientCharacteristics?: (INutrientCharacteristic & Semanticable)[], physicalCharacteristics?: (IPhysicalCharacteristic & Semanticable)[], geographicalOrigin?: (IGeographicalOrigin & Semanticable), catalogItems?: (ICatalogItem & Semanticable)[], certifications?: (ICertification & Semanticable)[], natureOrigin?: (INatureOrigin & Semanticable)[], partOrigin?: (IPartOrigin & Semanticable)[]}) {
		if (parameters.other) super({ semanticId: parameters.semanticId!, other: parameters.other })
		else super({ semanticId: parameters.semanticId!, semanticType: parameters.semanticType! });
		
		this.connector = parameters.connector;
		
		
		if (parameters.name) this.setName(parameters.name);
		if (parameters.description) this.setDescription(parameters.description);
		if (parameters.productType) this.setProductType(parameters.productType);
		if (parameters.quantity) this.setQuantity(parameters.quantity);
		if (parameters.alcoholPercentage || parameters.alcoholPercentage === 0) this.setAlcoholPercentage(parameters.alcoholPercentage);
		if (parameters.lifetime) this.setLifetime(parameters.lifetime);
		if (parameters.claims) parameters.claims.forEach(e => this.addClaim(e));
		if (parameters.usageOrStorageConditions) this.setUsageOrStorageConditions(parameters.usageOrStorageConditions);
		if (parameters.allergenCharacteristics) parameters.allergenCharacteristics.forEach(e => this.addAllergenCharacteristic(e));
		if (parameters.nutrientCharacteristics) parameters.nutrientCharacteristics.forEach(e => this.addNutrientCharacteristic(e));
		if (parameters.physicalCharacteristics) parameters.physicalCharacteristics.forEach(e => this.addPhysicalCharacteristic(e));
		if (parameters.geographicalOrigin) this.setGeographicalOrigin(parameters.geographicalOrigin);
		if (parameters.catalogItems) parameters.catalogItems.forEach(e => this.addCatalogItem(e));
		if (parameters.certifications) parameters.certifications.forEach(e => this.addCertification(e));
		if (parameters.natureOrigin) parameters.natureOrigin.forEach(e => this.addNatureOrigin(e));
		if (parameters.partOrigin) parameters.partOrigin.forEach(e => this.addPartOrigin(e));
	}

	public async getClaims(options?: IGetterOptions): Promise<Array<(Claimable & Semanticable)>>
	 {
		const results = new Array<(Claimable & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasClaim");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(Claimable & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public async getQuantity(options?: IGetterOptions): Promise<(Quantifiable & Semanticable) | undefined>
	 {
		const blankNode: any = this.getSemanticPropertyAnonymous("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasQuantity");
		return <Quantifiable & Semanticable> this.connector.getDefaultFactory().createFromRdfDataset(blankNode);
	}
	

	public async getProductType(options?: IGetterOptions): Promise<(IProductType & Semanticable) | undefined>
	 {
		let result: (IProductType & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasType");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) result = <(IProductType & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setProductType(productType: (IProductType & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasType";
		this.setSemanticPropertyReference(property, productType);
		this.connector.store(productType);
	}
	

	public removeClaim(claim: (Claimable & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public addClaim(claim: (Claimable & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasClaim";
		if (claim.isSemanticObjectAnonymous()) {
			if (claim.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, claim);
			else this.addSemanticPropertyReference(property, claim);
		}
		else {
			this.connector.store(claim);
			this.addSemanticPropertyReference(property, claim);
		}
	}
	

	public setQuantity(quantity: (Quantifiable & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasQuantity";
		this.setSemanticPropertyAnonymous(property, quantity);
	}
	
	public setDescription(description: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#description";
		this.setSemanticPropertyLiteral(property, description);
	}
	

	public getDescription(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#description");
	}
	
	public async getCatalogItems(options?: IGetterOptions): Promise<Array<(ICatalogItem & Semanticable)>>
	 {
		const results = new Array<(ICatalogItem & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#referencedBy");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(ICatalogItem & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public addCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#referencedBy";
		if (catalogItem.isSemanticObjectAnonymous()) {
			if (catalogItem.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, catalogItem);
			else this.addSemanticPropertyReference(property, catalogItem);
		}
		else {
			this.connector.store(catalogItem);
			this.addSemanticPropertyReference(property, catalogItem);
		}
	}
	
	public addPhysicalCharacteristic(physicalCharacteristic: (IPhysicalCharacteristic & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPhysicalCharacteristic";
		if (physicalCharacteristic.isSemanticObjectAnonymous()) {
			if (physicalCharacteristic.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, physicalCharacteristic);
			else this.addSemanticPropertyReference(property, physicalCharacteristic);
		}
		else {
			this.connector.store(physicalCharacteristic);
			this.addSemanticPropertyReference(property, physicalCharacteristic);
		}
	}
	

	public removeAllergenCharacteristic(allergenCharacteristic: (IAllergenCharacteristic & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public setAlcoholPercentage(alcoholPercentage: number): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#alcoholPercentage";
		this.setSemanticPropertyLiteral(property, alcoholPercentage);
	}
	

	public async getPhysicalCharacteristics(options?: IGetterOptions): Promise<Array<(IPhysicalCharacteristic & Semanticable)>>
	 {
		const results = new Array<(IPhysicalCharacteristic & Semanticable)>();
		const blankNodesId = this.getSemanticPropertyAnonymousAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPhysicalCharacteristic");
		blankNodesId.forEach(blankNodeId => {
			const blankNode = <(IPhysicalCharacteristic & Semanticable)> this.connector.getDefaultFactory().createFromRdfDataset(blankNodeId);
			results.push(blankNode);
		});return results;
	}
	

	public removeNutrientCharacteristic(nutrientCharacteristic: (INutrientCharacteristic & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public removePartOrigin(partOrigin: (IPartOrigin & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public removeNatureOrigin(natureOrigin: (INatureOrigin & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getGeographicalOrigin(options?: IGetterOptions): Promise<(IGeographicalOrigin & Semanticable) | undefined>
	 {
		let result: (IGeographicalOrigin & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasGeographicalOrigin");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) result = <(IGeographicalOrigin & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public async getNatureOrigin(options?: IGetterOptions): Promise<Array<(INatureOrigin & Semanticable)>>
	 {
		const results = new Array<(INatureOrigin & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNatureOrigin");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(INatureOrigin & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public addNutrientCharacteristic(nutrientCharacteristic: (INutrientCharacteristic & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNutrientCharacteristic";
		if (nutrientCharacteristic.isSemanticObjectAnonymous()) {
			if (nutrientCharacteristic.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, nutrientCharacteristic);
			else this.addSemanticPropertyReference(property, nutrientCharacteristic);
		}
		else {
			this.connector.store(nutrientCharacteristic);
			this.addSemanticPropertyReference(property, nutrientCharacteristic);
		}
	}
	

	public setUsageOrStorageConditions(usageOrStorageConditions: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#usageOrStorageCondition";
		this.setSemanticPropertyLiteral(property, usageOrStorageConditions);
	}
	

	public getLifetime(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lifetime");
	}
	

	public async getPartOrigin(options?: IGetterOptions): Promise<Array<(IPartOrigin & Semanticable)>>
	 {
		const results = new Array<(IPartOrigin & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPartOrigin");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(IPartOrigin & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public async getNutrientCharacteristics(options?: IGetterOptions): Promise<Array<(INutrientCharacteristic & Semanticable)>>
	 {
		const results = new Array<(INutrientCharacteristic & Semanticable)>();
		const blankNodesId = this.getSemanticPropertyAnonymousAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNutrientCharacteristic");
		blankNodesId.forEach(blankNodeId => {
			const blankNode = <(INutrientCharacteristic & Semanticable)> this.connector.getDefaultFactory().createFromRdfDataset(blankNodeId);
			results.push(blankNode);
		});return results;
	}
	

	public addPartOrigin(partOrigin: (IPartOrigin & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPartOrigin";
		if (partOrigin.isSemanticObjectAnonymous()) {
			if (partOrigin.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, partOrigin);
			else this.addSemanticPropertyReference(property, partOrigin);
		}
		else {
			this.connector.store(partOrigin);
			this.addSemanticPropertyReference(property, partOrigin);
		}
	}
	

	public setGeographicalOrigin(geographicalOrigin: (IGeographicalOrigin & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasGeographicalOrigin";
		this.setSemanticPropertyReference(property, geographicalOrigin);
		this.connector.store(geographicalOrigin);
	}
	

	public getUsageOrStorageConditions(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#usageOrStorageCondition");
	}
	

	public setLifetime(lifetime: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lifetime";
		this.setSemanticPropertyLiteral(property, lifetime);
	}
	

	public addAllergenCharacteristic(allergenCharacteristic: (IAllergenCharacteristic & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAllergenCharacteristic";
		if (allergenCharacteristic.isSemanticObjectAnonymous()) {
			if (allergenCharacteristic.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, allergenCharacteristic);
			else this.addSemanticPropertyReference(property, allergenCharacteristic);
		}
		else {
			this.connector.store(allergenCharacteristic);
			this.addSemanticPropertyReference(property, allergenCharacteristic);
		}
	}
	

	public addNatureOrigin(natureOrigin: (INatureOrigin & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNatureOrigin";
		if (natureOrigin.isSemanticObjectAnonymous()) {
			if (natureOrigin.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, natureOrigin);
			else this.addSemanticPropertyReference(property, natureOrigin);
		}
		else {
			this.connector.store(natureOrigin);
			this.addSemanticPropertyReference(property, natureOrigin);
		}
	}
	

	public removePhysicalCharacteristic(physicalCharacteristic: (IPhysicalCharacteristic & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getAllergenCharacteristics(options?: IGetterOptions): Promise<Array<(IAllergenCharacteristic & Semanticable)>>
	 {
		const results = new Array<(IAllergenCharacteristic & Semanticable)>();
		const blankNodesId = this.getSemanticPropertyAnonymousAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAllergenCharacteristic");
		blankNodesId.forEach(blankNodeId => {
			const blankNode = <(IAllergenCharacteristic & Semanticable)> this.connector.getDefaultFactory().createFromRdfDataset(blankNodeId);
			results.push(blankNode);
		});return results;
	}
	

	public getAlcoholPercentage(): number
	 {
		return Number(this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#alcoholPercentage"));
	}
	
	public addCertification(certification: (ICertification & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCertification";
		if (certification.isSemanticObjectAnonymous()) {
			if (certification.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, certification);
			else this.addSemanticPropertyReference(property, certification);
		}
		else {
			this.connector.store(certification);
			this.addSemanticPropertyReference(property, certification);
		}
	}
	

	public removeCertification(certification: (ICertification & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getCertifications(options?: IGetterOptions): Promise<Array<(ICertification & Semanticable)>>
	 {
		const results = new Array<(ICertification & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCertification");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(ICertification & Semanticable)> semanticObject);
		}
		return results;
	}
	
	public setName(name: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#name";
		this.setSemanticPropertyLiteral(property, name);
	}
	

	public getName(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#name");
	}
	

}
