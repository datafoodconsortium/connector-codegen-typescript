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

import IDefinedProduct from "./IDefinedProduct.js"
import IPhysicalCharacteristic from "./IPhysicalCharacteristic.js"
import IGeographicalOrigin from "./IGeographicalOrigin.js"
import IProductType from "./IProductType.js"
import IAllergenCharacteristic from "./IAllergenCharacteristic.js"
import INutrientCharacteristic from "./INutrientCharacteristic.js"
import ICertification from "./ICertification.js"
import INatureOrigin from "./INatureOrigin.js"
import Quantifiable from "./Quantifiable.js"
import IPartOrigin from "./IPartOrigin.js"
import Claimable from "./Claimable.js"
import ICatalogItem from "./ICatalogItem.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import Connector from "./Connector.js"

export default abstract class DefinedProduct extends SemanticObject implements IDefinedProduct {

	protected constructor(parameters: {semanticId?: string, semanticType?: string, other?: Semanticable, name?: string, description?: string, productType?: (IProductType & Semanticable), quantity?: (Quantifiable & Semanticable), alcoholPercentage?: number, lifetime?: string, claims?: (Claimable & Semanticable)[], usageOrStorageConditions?: string, allergenCharacteristics?: (IAllergenCharacteristic & Semanticable)[], nutrientCharacteristics?: (INutrientCharacteristic & Semanticable)[], physicalCharacteristics?: (IPhysicalCharacteristic & Semanticable)[], geographicalOrigin?: (IGeographicalOrigin & Semanticable), catalogItems?: (ICatalogItem & Semanticable)[], certifications?: (ICertification & Semanticable)[], natureOrigin?: (INatureOrigin & Semanticable)[], partOrigin?: (IPartOrigin & Semanticable)[]}) {
		super(parameters.semanticId, parameters.semanticType, parameters.other);
		
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

	public removeCertification(certification: (ICertification & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public addCertification(certification: (ICertification & Semanticable)): void {
		Connector.getInstance().store(certification);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCertification", certification);
	}
	

	public async getCertifications(): Promise<Array<(ICertification & Semanticable)>>
	 {
		const results = new Array<(ICertification & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCertification");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(ICertification & Semanticable)> semanticObject);
		});
		return results;
	}
	
	public getName(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#name");
	}
	

	public setName(name: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#name", name);
	}
	
	public async getQuantity(): Promise<(Quantifiable & Semanticable) | undefined>
	 {
		let result: (Quantifiable & Semanticable) | undefined = undefined;
		const property = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasQuantity");
		if (property) {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(property);
			if (semanticObject) result = <(Quantifiable & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public removeClaim(claim: (Claimable & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public addClaim(claim: (Claimable & Semanticable)): void {
		Connector.getInstance().store(claim);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasClaim", claim);
	}
	

	public async getProductType(): Promise<(IProductType & Semanticable) | undefined>
	 {
		let result: (IProductType & Semanticable) | undefined = undefined;
		const property = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasType");
		if (property) {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(property);
			if (semanticObject) result = <(IProductType & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setQuantity(quantity: (Quantifiable & Semanticable)): void {
		Connector.getInstance().store(quantity);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasQuantity", quantity);
	}
	

	public async getClaims(): Promise<Array<(Claimable & Semanticable)>>
	 {
		const results = new Array<(Claimable & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasClaim");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(Claimable & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public setProductType(productType: (IProductType & Semanticable)): void {
		Connector.getInstance().store(productType);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasType", productType);
	}
	
	public addNatureOrigin(natureOrigin: (INatureOrigin & Semanticable)): void {
		Connector.getInstance().store(natureOrigin);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNatureOrigin", natureOrigin);
	}
	

	public removePartOrigin(partOrigin: (IPartOrigin & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public removeAllergenCharacteristic(allergenCharacteristic: (IAllergenCharacteristic & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public getLifetime(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lifetime");
	}
	

	public getAlcoholPercentage(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#alcoholPercentage");
	}
	

	public async getPartOrigin(): Promise<Array<(IPartOrigin & Semanticable)>>
	 {
		const results = new Array<(IPartOrigin & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPartOrigin");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(IPartOrigin & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public addAllergenCharacteristic(allergenCharacteristic: (IAllergenCharacteristic & Semanticable)): void {
		Connector.getInstance().store(allergenCharacteristic);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAllergenCharacteristic", allergenCharacteristic);
	}
	

	public setUsageOrStorageConditions(usageOrStorageConditions: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#usageOrStorageCondition", usageOrStorageConditions);
	}
	

	public setGeographicalOrigin(geographicalOrigin: (IGeographicalOrigin & Semanticable)): void {
		Connector.getInstance().store(geographicalOrigin);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasGeographicalOrigin", geographicalOrigin);
	}
	

	public addPartOrigin(partOrigin: (IPartOrigin & Semanticable)): void {
		Connector.getInstance().store(partOrigin);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPartOrigin", partOrigin);
	}
	

	public async getPhysicalCharacteristics(): Promise<Array<(IPhysicalCharacteristic & Semanticable)>>
	 {
		const results = new Array<(IPhysicalCharacteristic & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPhysicalCharacteristic");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(IPhysicalCharacteristic & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public async getGeographicalOrigin(): Promise<(IGeographicalOrigin & Semanticable) | undefined>
	 {
		let result: (IGeographicalOrigin & Semanticable) | undefined = undefined;
		const property = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasGeographicalOrigin");
		if (property) {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(property);
			if (semanticObject) result = <(IGeographicalOrigin & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public addPhysicalCharacteristic(physicalCharacteristic: (IPhysicalCharacteristic & Semanticable)): void {
		Connector.getInstance().store(physicalCharacteristic);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPhysicalCharacteristic", physicalCharacteristic);
	}
	

	public removeNatureOrigin(natureOrigin: (INatureOrigin & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public setLifetime(lifetime: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lifetime", lifetime);
	}
	

	public async getAllergenCharacteristics(): Promise<Array<(IAllergenCharacteristic & Semanticable)>>
	 {
		const results = new Array<(IAllergenCharacteristic & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAllergenCharacteristic");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(IAllergenCharacteristic & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public getUsageOrStorageConditions(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#usageOrStorageCondition");
	}
	

	public addNutrientCharacteristic(nutrientCharacteristic: (INutrientCharacteristic & Semanticable)): void {
		Connector.getInstance().store(nutrientCharacteristic);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNutrientCharacteristic", nutrientCharacteristic);
	}
	

	public removeNutrientCharacteristic(nutrientCharacteristic: (INutrientCharacteristic & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getNutrientCharacteristics(): Promise<Array<(INutrientCharacteristic & Semanticable)>>
	 {
		const results = new Array<(INutrientCharacteristic & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNutrientCharacteristic");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(INutrientCharacteristic & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public async getNatureOrigin(): Promise<Array<(INatureOrigin & Semanticable)>>
	 {
		const results = new Array<(INatureOrigin & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNatureOrigin");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(INatureOrigin & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public setAlcoholPercentage(alcoholPercentage: number): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#alcoholPercentage", alcoholPercentage);
	}
	

	public removePhysicalCharacteristic(physicalCharacteristic: (IPhysicalCharacteristic & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	
	public setDescription(description: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#description", description);
	}
	

	public getDescription(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#description");
	}
	
	public async getCatalogItems(): Promise<Array<(ICatalogItem & Semanticable)>>
	 {
		const results = new Array<(ICatalogItem & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#referencedBy");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(ICatalogItem & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public addCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void {
		Connector.getInstance().store(catalogItem);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#referencedBy", catalogItem);
	}
	

}
