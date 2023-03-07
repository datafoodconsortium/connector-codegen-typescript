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

import Onboardable from "./Onboardable.js"
import Agent from "./Agent.js"
import IEnterprise from "./IEnterprise.js"
import Supplier from "./Supplier.js"
import SuppliedProduct from "./SuppliedProduct.js"
import ICatalogItem from "./ICatalogItem.js"
import Localizable from "./Localizable.js"
import ICustomerCategory from "./ICustomerCategory.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import Connector from "./Connector.js"

export default class Enterprise extends Agent implements Supplier, IEnterprise, Onboardable {

	public constructor(parameters: {semanticId: string, localizations?: (Localizable & Semanticable)[], description?: string});
	public constructor(parameters: {other: Semanticable, localizations?: (Localizable & Semanticable)[], description?: string});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, localizations?: (Localizable & Semanticable)[], description?: string}) {
		super({semanticId: parameters.semanticId, semanticType: "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Enterprise", other: parameters.other, localizations: parameters.localizations});
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.description) this.setDescription(parameters.description);
	}

	public async getSuppliedProducts(): Promise<Array<(SuppliedProduct & Semanticable)>>
	 {
		const results = new Array<(SuppliedProduct & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#supplies");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(SuppliedProduct & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public addCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void {
	}
	

	public async getCatalogItems(): Promise<Array<(ICatalogItem & Semanticable)>>
	 {
		const results = new Array<(ICatalogItem & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#manages");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(ICatalogItem & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public addSupplyProduct(suppliedProduct: (SuppliedProduct & Semanticable)): void {
	}
	
	public getDescription(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasDescription");
	}
	

	public setDescription(description: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasDescription", description);
	}
	
	public getVatNumber(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATnumber");
	}
	

	public setVatNumber(vatNumber: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATnumber", vatNumber);
	}
	
	public addCustomerCategory(customerCategory: (ICustomerCategory & Semanticable)): void {
		Connector.getInstance().store(customerCategory);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#defines", customerCategory);
	}
	

	public async getCustomerCategories(): Promise<Array<(ICustomerCategory & Semanticable)>>
	 {
		const results = new Array<(ICustomerCategory & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#defines");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(ICustomerCategory & Semanticable)> semanticObject);
		});
		return results;
	}
	

}
