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

import IOrderLine from "./IOrderLine.js"
import IOffer from "./IOffer.js"
import IPrice from "./IPrice.js"
import IOrder from "./IOrder.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class OrderLine extends SemanticObject implements IOrderLine {

	public constructor(parameters: {semanticId: string, quantity?: number, price?: (IPrice & Semanticable), offer?: (IOffer & Semanticable), order?: (IOrder & Semanticable)});
	public constructor(parameters: {other: Semanticable, quantity?: number, price?: (IPrice & Semanticable), offer?: (IOffer & Semanticable), order?: (IOrder & Semanticable)});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, quantity?: number, price?: (IPrice & Semanticable), offer?: (IOffer & Semanticable), order?: (IOrder & Semanticable)}) {
		super(parameters.semanticId, "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#OrderLine", parameters.other);
		connector.store(this);
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.quantity) this.setQuantity(parameters.quantity);
		if (parameters.price) this.setPrice(parameters.price);
		if (parameters.offer) this.setOffer(parameters.offer);
		if (parameters.order) this.setOrder(parameters.order);
	}

	public async getOrder(options?: IGetterOptions): Promise<(IOrder & Semanticable) | undefined>
	 {
		let result: (IOrder & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#partOf");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) result = <(IOrder & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setQuantity(quantity: number): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#quantity", quantity);
	}
	

	public setPrice(price: (IPrice & Semanticable)): void {
		connector.store(price);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPrice", price);
	}
	

	public async getOffer(options?: IGetterOptions): Promise<(IOffer & Semanticable) | undefined>
	 {
		let result: (IOffer & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#concerns");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) result = <(IOffer & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public getQuantity(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#quantity");
	}
	

	public async getPrice(options?: IGetterOptions): Promise<(IPrice & Semanticable) | undefined>
	 {
		let result: (IPrice & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPrice");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) result = <(IPrice & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setOffer(offer: (IOffer & Semanticable)): void {
		connector.store(offer);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#concerns", offer);
	}
	

	public setOrder(order: (IOrder & Semanticable)): void {
		connector.store(order);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#partOf", order);
	}
	

}
