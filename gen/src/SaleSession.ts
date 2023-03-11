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
import ISaleSession from "./ISaleSession.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class SaleSession extends SemanticObject implements ISaleSession {

	public constructor(parameters: {semanticId: string, beginDate?: string, endDate?: string, quantity?: number, offers?: (IOffer & Semanticable)[]});
	public constructor(parameters: {other: Semanticable, beginDate?: string, endDate?: string, quantity?: number, offers?: (IOffer & Semanticable)[]});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, beginDate?: string, endDate?: string, quantity?: number, offers?: (IOffer & Semanticable)[]}) {
		super(parameters.semanticId, "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#SaleSession", parameters.other);
		connector.store(this);
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.beginDate) this.setBeginDate(parameters.beginDate);
		if (parameters.endDate) this.setEndDate(parameters.endDate);
		if (parameters.quantity) this.setQuantity(parameters.quantity);
		if (parameters.offers) parameters.offers.forEach(e => this.addOffer(e));
	}

	public addOffer(offer: (IOffer & Semanticable)): void {
		connector.store(offer);
		this.setSemanticPropertyReference("invalid", offer);
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
	

	public getQuantity(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#quantity");
	}
	

	public setQuantity(quantity: number): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#quantity", quantity);
	}
	
	public setBeginDate(beginDate: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#beginDate", beginDate);
	}
	

	public getBeginDate(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#beginDate");
	}
	

	public setEndDate(endDate: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#endDate", endDate);
	}
	

	public getEndDate(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#endDate");
	}
	

}
