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

import ISaleSession from "./ISaleSession.js"
import IOffer from "./IOffer.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class SaleSession extends SemanticObject implements ISaleSession {

	public constructor(parameters: {semanticId: string, beginDate?: string, endDate?: string, quantity?: number, offers?: (IOffer & Semanticable)[]});
	public constructor(parameters: {semanticId: string, other: Semanticable});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, beginDate?: string, endDate?: string, quantity?: number, offers?: (IOffer & Semanticable)[]}) {
		const type: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#SaleSession";
		
		if (parameters.other) {
			super({ semanticId: parameters.semanticId!, other: parameters.other })
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ semanticId: parameters.semanticId!, semanticType: type });
		
		connector.store(this);
		
		if (parameters.beginDate) this.setBeginDate(parameters.beginDate);
		if (parameters.endDate) this.setEndDate(parameters.endDate);
		if (parameters.quantity) this.setQuantity(parameters.quantity);
		if (parameters.offers) parameters.offers.forEach(e => this.addOffer(e));
	}

	public getQuantity(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#quantity");
	}
	

	public addOffer(offer: (IOffer & Semanticable)): void {
		
	}
	

	public async getOffers(options?: IGetterOptions): Promise<Array<(IOffer & Semanticable)>>
	 {
		const results = new Array<(IOffer & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lists");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(IOffer & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public setQuantity(quantity: number): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#quantity";
		this.setSemanticPropertyLiteral(property, quantity);
	}
	
	public getEndDate(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#endDate");
	}
	

	public getBeginDate(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#beginDate");
	}
	

	public setEndDate(endDate: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#endDate";
		this.setSemanticPropertyLiteral(property, endDate);
	}
	

	public setBeginDate(beginDate: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#beginDate";
		this.setSemanticPropertyLiteral(property, beginDate);
	}
	

}
