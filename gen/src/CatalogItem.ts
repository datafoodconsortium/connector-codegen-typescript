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

import IOffer from "./IOffer.js"
import IDefinedProduct from "./IDefinedProduct.js"
import ICatalogItem from "./ICatalogItem.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js"

export default class CatalogItem extends SemanticObject implements ICatalogItem {

	public constructor(parameters: {semanticId: string, product?: (IDefinedProduct & Semanticable)});
	public constructor(parameters: {other: Semanticable, product?: (IDefinedProduct & Semanticable)});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, product?: (IDefinedProduct & Semanticable)}) {
		super(parameters.semanticId, "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#CatalogItem", parameters.other);
		connector.store(this);
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.product) this.setOfferedProduct(parameters.product);
	}

	public addOffer(offer: (IOffer & Semanticable)): void {
		connector.store(offer);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredThrough", offer);
	}
	

	public async getOfferedProduct(): Promise<(IDefinedProduct & Semanticable) | undefined>
	 {
		let result: (IDefinedProduct & Semanticable) | undefined = undefined;
		const property = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#references");
		if (property) {
			const semanticObject: Semanticable | undefined = await connector.fetch(property);
			if (semanticObject) result = <(IDefinedProduct & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setOfferedProduct(offeredProduct: (IDefinedProduct & Semanticable)): void {
		connector.store(offeredProduct);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#references", offeredProduct);
	}
	

	public async getOfferers(): Promise<Array<(IOffer & Semanticable)>>
	 {
		const results = new Array<(IOffer & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredThrough");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId);
			if (semanticObject) results.push(<(IOffer & Semanticable)> semanticObject);
		}
		return results;
	}
	
	public setSku(sku: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#sku", sku);
	}
	

	public getSku(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#sku");
	}
	
	public setStockLimitation(stockLimitation: number): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation", stockLimitation);
	}
	

	public getStockLimitation(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation");
	}
	

}
