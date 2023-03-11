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

import ICustomerCategory from "./ICustomerCategory.js"
import Onboardable from "./Onboardable.js"
import Localizable from "./Localizable.js"
import ICatalogItem from "./ICatalogItem.js"
import IEnterprise from "./IEnterprise.js"
import SuppliedProduct from "./SuppliedProduct.js"
import Supplier from "./Supplier.js"
import Agent from "./Agent.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class Enterprise extends Agent implements Onboardable, Supplier, IEnterprise {

	public constructor(parameters: {semanticId: string, localizations?: (Localizable & Semanticable)[], description?: string, vatNumber?: string, customerCategories?: (ICustomerCategory & Semanticable)[], suppliedProducts?: (SuppliedProduct & Semanticable)[], catalogItems?: (ICatalogItem & Semanticable)[]});
	public constructor(parameters: {semanticId: string, other: Semanticable});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, localizations?: (Localizable & Semanticable)[], description?: string, vatNumber?: string, customerCategories?: (ICustomerCategory & Semanticable)[], suppliedProducts?: (SuppliedProduct & Semanticable)[], catalogItems?: (ICatalogItem & Semanticable)[]}) {
		const type: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Enterprise";
		
		if (parameters.other) {
			super({ semanticId: parameters.semanticId!, other: parameters.other })
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ semanticId: parameters.semanticId!, semanticType: type, localizations: parameters.localizations });
		
		connector.store(this);
		
		if (parameters.description) this.setDescription(parameters.description);
		if (parameters.vatNumber) this.setVatNumber(parameters.vatNumber);
		if (parameters.customerCategories) parameters.customerCategories.forEach(e => this.addCustomerCategory(e));
		if (parameters.suppliedProducts) parameters.suppliedProducts.forEach(e => this.addSupplyProduct(e));
		if (parameters.catalogItems) parameters.catalogItems.forEach(e => this.addCatalogItem(e));
	}

	public async getSuppliedProducts(options?: IGetterOptions): Promise<Array<(SuppliedProduct & Semanticable)>>
	 {
		const results = new Array<(SuppliedProduct & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#supplies");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(SuppliedProduct & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public async getCatalogItems(options?: IGetterOptions): Promise<Array<(ICatalogItem & Semanticable)>>
	 {
		const results = new Array<(ICatalogItem & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#manages");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(ICatalogItem & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public addSupplyProduct(suppliedProduct: (SuppliedProduct & Semanticable)): void {
	}
	

	public addCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void {
	}
	
	public getVatNumber(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATnumber");
	}
	

	public setVatNumber(vatNumber: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATnumber";
		this.setSemanticPropertyLiteral(property, vatNumber);
	}
	
	public addCustomerCategory(customerCategory: (ICustomerCategory & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#defines";
		if (customerCategory.isSemanticObjectAnonymous()) {
			if (customerCategory.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, customerCategory);
			else this.addSemanticPropertyReference(property, customerCategory);
		}
		else {
			connector.store(customerCategory);
			this.addSemanticPropertyReference(property, customerCategory);
		}
	}
	

	public async getCustomerCategories(options?: IGetterOptions): Promise<Array<(ICustomerCategory & Semanticable)>>
	 {
		const results = new Array<(ICustomerCategory & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#defines");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(ICustomerCategory & Semanticable)> semanticObject);
		}
		return results;
	}
	
	public getDescription(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasDescription");
	}
	

	public setDescription(description: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasDescription";
		this.setSemanticPropertyLiteral(property, description);
	}
	

}
