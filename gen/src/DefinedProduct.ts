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

import Quantifiable from "./Quantifiable.js"
import IDefinedProduct from "./IDefinedProduct.js"
import ICertification from "./ICertification.js"
import IGeographicalOrigin from "./IGeographicalOrigin.js"
import INatureOrigin from "./INatureOrigin.js"
import ICatalogItem from "./ICatalogItem.js"
import IPhysicalCharacteristic from "./IPhysicalCharacteristic.js"
import IPartOrigin from "./IPartOrigin.js"
import IProductType from "./IProductType.js"
import IAllergenCharacteristic from "./IAllergenCharacteristic.js"
import Claimable from "./Claimable.js"
import INutrientCharacteristic from "./INutrientCharacteristic.js"
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
		if (parameters.alcoholPercentage) this.setAlcoholPercentage(parameters.alcoholPercentage);
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

	public getName(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#name");
	}
	

	public setName(name: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#name";
		this.setSemanticPropertyLiteral(property, name);
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
	

	public addClaim(claim: (Claimable & Semanticable)): void {
	}
	

	public setQuantity(quantity: (Quantifiable & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasQuantity";
		this.setSemanticPropertyReference(property, quantity);
		this.connector.store(quantity);
	}
	

	public removeClaim(claim: (Claimable & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public setProductType(productType: (IProductType & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasType";
		this.setSemanticPropertyReference(property, productType);
		this.connector.store(productType);
	}
	

	public async getQuantity(options?: IGetterOptions): Promise<(Quantifiable & Semanticable) | undefined>
	 {
		let result: (Quantifiable & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasQuantity");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) result = <(Quantifiable & Semanticable) | undefined> semanticObject;
		}
		return result;
		
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
	

	public addCertification(certification: (ICertification & Semanticable)): void {
	}
	

	public removeCertification(certification: (ICertification & Semanticable)): void {
		throw new Error("Not yet implemented.");
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
	}
	
	public getDescription(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#description");
	}
	

	public setDescription(description: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#description";
		this.setSemanticPropertyLiteral(property, description);
	}
	
	public getAlcoholPercentage(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#alcoholPercentage");
	}
	

	public getUsageOrStorageConditions(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#usageOrStorageCondition");
	}
	

	public addPhysicalCharacteristic(physicalCharacteristic: (IPhysicalCharacteristic & Semanticable)): void {
	}
	

	public async getPhysicalCharacteristics(options?: IGetterOptions): Promise<Array<(IPhysicalCharacteristic & Semanticable)>>
	 {
		const results = new Array<(IPhysicalCharacteristic & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPhysicalCharacteristic");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(IPhysicalCharacteristic & Semanticable)> semanticObject);
		}
		return results;
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
	

	public setUsageOrStorageConditions(usageOrStorageConditions: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#usageOrStorageCondition";
		this.setSemanticPropertyLiteral(property, usageOrStorageConditions);
	}
	

	public removeNutrientCharacteristic(nutrientCharacteristic: (INutrientCharacteristic & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public removeNatureOrigin(natureOrigin: (INatureOrigin & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public removeAllergenCharacteristic(allergenCharacteristic: (IAllergenCharacteristic & Semanticable)): void {
		throw new Error("Not yet implemented.");
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
	

	public addNutrientCharacteristic(nutrientCharacteristic: (INutrientCharacteristic & Semanticable)): void {
	}
	

	public async getNutrientCharacteristics(options?: IGetterOptions): Promise<Array<(INutrientCharacteristic & Semanticable)>>
	 {
		const results = new Array<(INutrientCharacteristic & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNutrientCharacteristic");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(INutrientCharacteristic & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public setGeographicalOrigin(geographicalOrigin: (IGeographicalOrigin & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasGeographicalOrigin";
		this.setSemanticPropertyReference(property, geographicalOrigin);
		this.connector.store(geographicalOrigin);
	}
	

	public removePhysicalCharacteristic(physicalCharacteristic: (IPhysicalCharacteristic & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public setAlcoholPercentage(alcoholPercentage: number): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#alcoholPercentage";
		this.setSemanticPropertyLiteral(property, alcoholPercentage);
	}
	

	public setLifetime(lifetime: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lifetime";
		this.setSemanticPropertyLiteral(property, lifetime);
	}
	

	public addAllergenCharacteristic(allergenCharacteristic: (IAllergenCharacteristic & Semanticable)): void {
	}
	

	public getLifetime(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lifetime");
	}
	

	public addPartOrigin(partOrigin: (IPartOrigin & Semanticable)): void {
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
	

	public addNatureOrigin(natureOrigin: (INatureOrigin & Semanticable)): void {
	}
	

	public removePartOrigin(partOrigin: (IPartOrigin & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getAllergenCharacteristics(options?: IGetterOptions): Promise<Array<(IAllergenCharacteristic & Semanticable)>>
	 {
		const results = new Array<(IAllergenCharacteristic & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAllergenCharacteristic");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(IAllergenCharacteristic & Semanticable)> semanticObject);
		}
		return results;
	}
	

}
