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
import ICatalogItem from "./ICatalogItem.js"
import Browsable from "./Browsable.js"
import IOffer from "./IOffer.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import IConnector from "./IConnector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class CatalogItem extends SemanticObject implements ICatalogItem {
	
	protected connector: IConnector;

	public constructor(parameters: {connector: IConnector, doNotStore?: boolean, semanticId?: string, other?: Semanticable, product?: (IDefinedProduct & Semanticable), sku?: string, stockLimitation?: number, offers?: (IOffer & Semanticable)[], catalogs?: (Browsable & Semanticable)[]}) {
		const type: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#CatalogItem";
		
		if (parameters.other) {
			super({ semanticId: parameters.semanticId!, other: parameters.other });
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ semanticId: parameters.semanticId!, semanticType: type });
		
		this.connector = parameters.connector;
		
		
		if (!parameters.doNotStore)
			this.connector.store(this);
		if (parameters.product) this.setOfferedProduct(parameters.product);
		if (parameters.sku) this.setSku(parameters.sku);
		if (parameters.stockLimitation) this.setStockLimitation(parameters.stockLimitation);
		if (parameters.offers) parameters.offers.forEach(e => this.addOffer(e));
		if (parameters.catalogs) parameters.catalogs.forEach(e => this.registerInCatalog(e));
	}

	public setSku(sku: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#sku";
		this.setSemanticPropertyLiteral(property, sku);
	}
	

	public getSku(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#sku");
	}
	
	public setStockLimitation(stockLimitation: number): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation";
		this.setSemanticPropertyLiteral(property, stockLimitation);
	}
	

	public getStockLimitation(): number
	 {
		return Number(this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation"));
	}
	
	public addOffer(offer: (IOffer & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredThrough";
		if (offer.isSemanticObjectAnonymous()) {
			if (offer.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, offer);
			else this.addSemanticPropertyReference(property, offer);
		}
		else {
			this.connector.store(offer);
			this.addSemanticPropertyReference(property, offer);
		}
	}
	

	public setOfferedProduct(offeredProduct: (IDefinedProduct & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#references";
		this.setSemanticPropertyReference(property, offeredProduct);
		this.connector.store(offeredProduct);
	}
	

	public async getOfferedProduct(options?: IGetterOptions): Promise<(IDefinedProduct & Semanticable) | undefined>
	 {
		let result: (IDefinedProduct & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#references");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) result = <(IDefinedProduct & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public async getOfferers(options?: IGetterOptions): Promise<Array<(IOffer & Semanticable)>>
	 {
		const results = new Array<(IOffer & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredThrough");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(IOffer & Semanticable)> semanticObject);
		}
		return results;
	}
	
	public async getCatalogs(options?: IGetterOptions): Promise<Array<(Browsable & Semanticable)>>
	 {
		const results = new Array<(Browsable & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#listedIn");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(Browsable & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public registerInCatalog(repository: (Browsable & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#listedIn";
		if (repository.isSemanticObjectAnonymous()) {
			if (repository.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, repository);
			else this.addSemanticPropertyReference(property, repository);
		}
		else {
			this.connector.store(repository);
			this.addSemanticPropertyReference(property, repository);
		}
	}
	

}
