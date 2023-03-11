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

import Browsable from "./Browsable.js"
import IOffer from "./IOffer.js"
import IDefinedProduct from "./IDefinedProduct.js"
import ICatalogItem from "./ICatalogItem.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class CatalogItem extends SemanticObject implements ICatalogItem {

	public constructor(parameters: {semanticId: string, product?: (IDefinedProduct & Semanticable), sku?: string, stockLimitation?: number, offers?: (IOffer & Semanticable)[], catalogs?: (Browsable & Semanticable)[]});
	public constructor(parameters: {other: Semanticable, product?: (IDefinedProduct & Semanticable), sku?: string, stockLimitation?: number, offers?: (IOffer & Semanticable)[], catalogs?: (Browsable & Semanticable)[]});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, product?: (IDefinedProduct & Semanticable), sku?: string, stockLimitation?: number, offers?: (IOffer & Semanticable)[], catalogs?: (Browsable & Semanticable)[]}) {
		super(parameters.semanticId, "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#CatalogItem", parameters.other);
		connector.store(this);
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.product) this.setOfferedProduct(parameters.product);
		if (parameters.sku) this.setSku(parameters.sku);
		if (parameters.stockLimitation) this.setStockLimitation(parameters.stockLimitation);
		if (parameters.offers) parameters.offers.forEach(e => this.addOffer(e));
		if (parameters.catalogs) parameters.catalogs.forEach(e => this.registerInCatalog(e));
	}

	public addOffer(offer: (IOffer & Semanticable)): void {
		connector.store(offer);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredThrough", offer);
	}
	

	public setOfferedProduct(offeredProduct: (IDefinedProduct & Semanticable)): void {
		connector.store(offeredProduct);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#references", offeredProduct);
	}
	

	public async getOfferers(options?: IGetterOptions): Promise<Array<(IOffer & Semanticable)>>
	 {
		const results = new Array<(IOffer & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredThrough");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(IOffer & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public async getOfferedProduct(options?: IGetterOptions): Promise<(IDefinedProduct & Semanticable) | undefined>
	 {
		let result: (IDefinedProduct & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#references");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) result = <(IDefinedProduct & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	
	public setStockLimitation(stockLimitation: number): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation", stockLimitation);
	}
	

	public getStockLimitation(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation");
	}
	
	public setSku(sku: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#sku", sku);
	}
	

	public getSku(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#sku");
	}
	
	public async getCatalogs(options?: IGetterOptions): Promise<Array<(Browsable & Semanticable)>>
	 {
		const results = new Array<(Browsable & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#listedIn");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(Browsable & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public registerInCatalog(repository: (Browsable & Semanticable)): void {
		connector.store(repository);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#listedIn", repository);
	}
	

}
