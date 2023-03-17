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

import IPrice from "./IPrice.js"
import IOrderLine from "./IOrderLine.js"
import IOffer from "./IOffer.js"
import IOrder from "./IOrder.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import IConnector from "./IConnector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class OrderLine extends SemanticObject implements IOrderLine {
	
	protected connector: IConnector;

	public constructor(parameters: {connector: IConnector, doNotStore?: boolean, semanticId?: string, other?: Semanticable, quantity?: number, price?: (IPrice & Semanticable), offer?: (IOffer & Semanticable), order?: (IOrder & Semanticable)}) {
		const type: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#OrderLine";
		
		if (parameters.other) {
			super({ semanticId: parameters.semanticId!, other: parameters.other });
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ semanticId: parameters.semanticId!, semanticType: type });
		
		this.connector = parameters.connector;
		
		
		if (!parameters.doNotStore)
			this.connector.store(this);
		if (parameters.quantity) this.setQuantity(parameters.quantity);
		if (parameters.price) this.setPrice(parameters.price);
		if (parameters.offer) this.setOffer(parameters.offer);
		if (parameters.order) this.setOrder(parameters.order);
	}

	public setPrice(price: (IPrice & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPrice";
		if (price.isSemanticObjectAnonymous()) {
			if (price.hasSemanticPropertiesOtherThanType()) this.setSemanticPropertyAnonymous(property, price);
			else this.setSemanticPropertyReference(property, price);
		}
		else {
			this.connector.store(price);
			this.setSemanticPropertyReference(property, price);
		}
	}
	

	public setOrder(order: (IOrder & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#partOf";
		if (order.isSemanticObjectAnonymous()) {
			if (order.hasSemanticPropertiesOtherThanType()) this.setSemanticPropertyAnonymous(property, order);
			else this.setSemanticPropertyReference(property, order);
		}
		else {
			this.connector.store(order);
			this.setSemanticPropertyReference(property, order);
		}
	}
	

	public async getOffer(options?: IGetterOptions): Promise<(IOffer & Semanticable) | undefined>
	 {
		let result: (IOffer & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#concerns");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) result = <(IOffer & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public async getOrder(options?: IGetterOptions): Promise<(IOrder & Semanticable) | undefined>
	 {
		let result: (IOrder & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#partOf");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) result = <(IOrder & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setOffer(offer: (IOffer & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#concerns";
		if (offer.isSemanticObjectAnonymous()) {
			if (offer.hasSemanticPropertiesOtherThanType()) this.setSemanticPropertyAnonymous(property, offer);
			else this.setSemanticPropertyReference(property, offer);
		}
		else {
			this.connector.store(offer);
			this.setSemanticPropertyReference(property, offer);
		}
	}
	

	public setQuantity(quantity: number): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#quantity";
		this.setSemanticPropertyLiteral(property, quantity);
	}
	

	public async getPrice(options?: IGetterOptions): Promise<(IPrice & Semanticable) | undefined>
	 {
		let result: (IPrice & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPrice");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) result = <(IPrice & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public getQuantity(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#quantity");
	}
	

}
