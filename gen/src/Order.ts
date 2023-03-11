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

import Agent from "./Agent.js"
import IOrder from "./IOrder.js"
import ISaleSession from "./ISaleSession.js"
import IOrderLine from "./IOrderLine.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class Order extends SemanticObject implements IOrder {

	public constructor(parameters: {semanticId: string, number?: string, date?: string, saleSession?: (ISaleSession & Semanticable), client?: (Agent & Semanticable)});
	public constructor(parameters: {other: Semanticable, number?: string, date?: string, saleSession?: (ISaleSession & Semanticable), client?: (Agent & Semanticable)});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, number?: string, date?: string, saleSession?: (ISaleSession & Semanticable), client?: (Agent & Semanticable)}) {
		super(parameters.semanticId, "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Order", parameters.other);
		connector.store(this);
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.number) this.setNumber(parameters.number);
		if (parameters.date) this.setDate(parameters.date);
		if (parameters.saleSession) this.setSaleSession(parameters.saleSession);
		if (parameters.client) this.setClient(parameters.client);
	}

	public setNumber(number: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#orderNumber", number);
	}
	

	public setSaleSession(saleSession: (ISaleSession & Semanticable)): void {
		connector.store(saleSession);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#belongsTo", saleSession);
	}
	

	public getNumber(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#orderNumber");
	}
	

	public async getClient(options?: IGetterOptions): Promise<(Agent & Semanticable) | undefined>
	 {
		let result: (Agent & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#orderedBy");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) result = <(Agent & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public async getLines(options?: IGetterOptions): Promise<Array<(IOrderLine & Semanticable)>>
	 {
		const results = new Array<(IOrderLine & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPart");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(IOrderLine & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public setDate(date: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#date", date);
	}
	

	public addLine(line: (IOrderLine & Semanticable)): void {
		connector.store(line);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPart", line);
	}
	

	public async getSaleSession(options?: IGetterOptions): Promise<(ISaleSession & Semanticable) | undefined>
	 {
		let result: (ISaleSession & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#belongsTo");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) result = <(ISaleSession & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setClient(client: (Agent & Semanticable)): void {
		connector.store(client);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#orderedBy", client);
	}
	

	public getDate(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#date");
	}
	

}
