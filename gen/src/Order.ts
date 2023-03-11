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

import IOrder from "./IOrder.js"
import ISaleSession from "./ISaleSession.js"
import Agent from "./Agent.js"
import IOrderLine from "./IOrderLine.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class Order extends SemanticObject implements IOrder {

	public constructor(parameters: {semanticId: string, number?: string, date?: string, saleSession?: (ISaleSession & Semanticable), client?: (Agent & Semanticable)});
	public constructor(parameters: {semanticId: string, other: Semanticable});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, number?: string, date?: string, saleSession?: (ISaleSession & Semanticable), client?: (Agent & Semanticable)}) {
		const type: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Order";
		
		if (parameters.other) {
			super({ semanticId: parameters.semanticId!, other: parameters.other })
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ semanticId: parameters.semanticId!, semanticType: type });
		
		connector.store(this);
		
		if (parameters.number) this.setNumber(parameters.number);
		if (parameters.date) this.setDate(parameters.date);
		if (parameters.saleSession) this.setSaleSession(parameters.saleSession);
		if (parameters.client) this.setClient(parameters.client);
	}

	public getNumber(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#orderNumber");
	}
	

	public setClient(client: (Agent & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#orderedBy";
		if (client.isSemanticObjectAnonymous()) {
			if (client.hasSemanticPropertiesOtherThanType()) this.setSemanticPropertyAnonymous(property, client);
			else this.setSemanticPropertyReference(property, client);
		}
		else {
			connector.store(client);
			this.setSemanticPropertyReference(property, client);
		}
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
	

	public setNumber(number: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#orderNumber";
		this.setSemanticPropertyLiteral(property, number);
	}
	

	public setDate(date: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#date";
		this.setSemanticPropertyLiteral(property, date);
	}
	

	public getDate(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#date");
	}
	

	public setSaleSession(saleSession: (ISaleSession & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#belongsTo";
		if (saleSession.isSemanticObjectAnonymous()) {
			if (saleSession.hasSemanticPropertiesOtherThanType()) this.setSemanticPropertyAnonymous(property, saleSession);
			else this.setSemanticPropertyReference(property, saleSession);
		}
		else {
			connector.store(saleSession);
			this.setSemanticPropertyReference(property, saleSession);
		}
	}
	

	public addLine(line: (IOrderLine & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPart";
		if (line.isSemanticObjectAnonymous()) {
			if (line.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, line);
			else this.addSemanticPropertyReference(property, line);
		}
		else {
			connector.store(line);
			this.addSemanticPropertyReference(property, line);
		}
	}
	

}
