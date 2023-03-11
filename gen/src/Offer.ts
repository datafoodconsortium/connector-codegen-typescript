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

import ICatalogItem from "./ICatalogItem.js"
import ICustomerCategory from "./ICustomerCategory.js"
import IOffer from "./IOffer.js"
import IPrice from "./IPrice.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class Offer extends SemanticObject implements IOffer {

	public constructor(parameters: {semanticId: string, offeredItem?: (ICatalogItem & Semanticable), offeredTo?: (ICustomerCategory & Semanticable), price?: (IPrice & Semanticable), stockLimitation?: number});
	public constructor(parameters: {other: Semanticable, offeredItem?: (ICatalogItem & Semanticable), offeredTo?: (ICustomerCategory & Semanticable), price?: (IPrice & Semanticable), stockLimitation?: number});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, offeredItem?: (ICatalogItem & Semanticable), offeredTo?: (ICustomerCategory & Semanticable), price?: (IPrice & Semanticable), stockLimitation?: number}) {
		super(parameters.semanticId, "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Offer", parameters.other);
		connector.store(this);
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.offeredItem) this.setOfferedItem(parameters.offeredItem);
		if (parameters.offeredTo) this.setCustomerCategory(parameters.offeredTo);
		if (parameters.price) this.setPrice(parameters.price);
		if (parameters.stockLimitation) this.setStockLimitation(parameters.stockLimitation);
	}

	public setPrice(price: (IPrice & Semanticable)): void {
		connector.store(price);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#price", price);
	}
	

	public async getPrice(options?: IGetterOptions): Promise<(IPrice & Semanticable) | undefined>
	 {
		let result: (IPrice & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#price");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) result = <(IPrice & Semanticable) | undefined> semanticObject;
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
	
	public async getOfferedItem(options?: IGetterOptions): Promise<(ICatalogItem & Semanticable) | undefined>
	 {
		let result: (ICatalogItem & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredItem");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) result = <(ICatalogItem & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setCustomerCategory(customerCategory: (ICustomerCategory & Semanticable)): void {
		connector.store(customerCategory);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredTo", customerCategory);
	}
	

	public async getCustomerCategory(options?: IGetterOptions): Promise<(ICustomerCategory & Semanticable) | undefined>
	 {
		let result: (ICustomerCategory & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredTo");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) result = <(ICustomerCategory & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setOfferedItem(offeredItem: (ICatalogItem & Semanticable)): void {
		connector.store(offeredItem);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredItem", offeredItem);
	}
	

}
