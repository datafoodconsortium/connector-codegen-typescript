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
import IPrice from "./IPrice.js"
import ICustomerCategory from "./ICustomerCategory.js"
import IOffer from "./IOffer.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import IConnector from "./IConnector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class Offer extends SemanticObject implements IOffer {
	
	protected connector: IConnector;

	public constructor(parameters: {connector: IConnector, doNotStore?: boolean, semanticId?: string, other?: Semanticable, offeredItem?: (ICatalogItem & Semanticable), offeredTo?: (ICustomerCategory & Semanticable), price?: (IPrice & Semanticable), stockLimitation?: number}) {
		const type: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Offer";
		
		if (parameters.other) {
			super({ semanticId: parameters.semanticId!, other: parameters.other });
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ semanticId: parameters.semanticId!, semanticType: type });
		
		this.connector = parameters.connector;
		
		
		if (!parameters.doNotStore)
			this.connector.store(this);
		if (parameters.offeredItem) this.setOfferedItem(parameters.offeredItem);
		if (parameters.offeredTo) this.setCustomerCategory(parameters.offeredTo);
		if (parameters.price) this.setPrice(parameters.price);
		if (parameters.stockLimitation) this.setStockLimitation(parameters.stockLimitation);
	}

	public getStockLimitation(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation");
	}
	

	public setStockLimitation(stockLimitation: number): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation";
		this.setSemanticPropertyLiteral(property, stockLimitation);
	}
	
	public setOfferedItem(offeredItem: (ICatalogItem & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredItem";
		if (offeredItem.isSemanticObjectAnonymous()) {
			if (offeredItem.hasSemanticPropertiesOtherThanType()) this.setSemanticPropertyAnonymous(property, offeredItem);
			else this.setSemanticPropertyReference(property, offeredItem);
		}
		else {
			this.connector.store(offeredItem);
			this.setSemanticPropertyReference(property, offeredItem);
		}
	}
	

	public async getOfferedItem(options?: IGetterOptions): Promise<(ICatalogItem & Semanticable) | undefined>
	 {
		let result: (ICatalogItem & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredItem");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) result = <(ICatalogItem & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public async getCustomerCategory(options?: IGetterOptions): Promise<(ICustomerCategory & Semanticable) | undefined>
	 {
		let result: (ICustomerCategory & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredTo");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) result = <(ICustomerCategory & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setCustomerCategory(customerCategory: (ICustomerCategory & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredTo";
		if (customerCategory.isSemanticObjectAnonymous()) {
			if (customerCategory.hasSemanticPropertiesOtherThanType()) this.setSemanticPropertyAnonymous(property, customerCategory);
			else this.setSemanticPropertyReference(property, customerCategory);
		}
		else {
			this.connector.store(customerCategory);
			this.setSemanticPropertyReference(property, customerCategory);
		}
	}
	
	public async getPrice(options?: IGetterOptions): Promise<(IPrice & Semanticable) | undefined>
	 {
		let result: (IPrice & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#price");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) result = <(IPrice & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setPrice(price: (IPrice & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#price";
		if (price.isSemanticObjectAnonymous()) {
			if (price.hasSemanticPropertiesOtherThanType()) this.setSemanticPropertyAnonymous(property, price);
			else this.setSemanticPropertyReference(property, price);
		}
		else {
			this.connector.store(price);
			this.setSemanticPropertyReference(property, price);
		}
	}
	

}
