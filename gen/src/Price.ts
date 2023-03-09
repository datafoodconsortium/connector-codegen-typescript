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

import IUnit from "./IUnit.js"
import IPrice from "./IPrice.js"
import { SemanticObjectAnonymous } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js"

export default class Price extends SemanticObjectAnonymous implements IPrice {

	public constructor(parameters: {value?: number, vatRate?: number, unit?: (IUnit & Semanticable)});
	public constructor(parameters: {other: Semanticable, value?: number, vatRate?: number, unit?: (IUnit & Semanticable)});
	public constructor(parameters: {semanticType?: string, other?: Semanticable, value?: number, vatRate?: number, unit?: (IUnit & Semanticable)}) {
		super(parameters.other? parameters.other.getSemanticType(): parameters.semanticType);
		connector.store(this);
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.value) this.setValue(parameters.value);
		if (parameters.vatRate) this.setVatRate(parameters.vatRate);
		if (parameters.unit) this.setUnit(parameters.unit);
	}

	public setUnit(unit: (IUnit & Semanticable)): void {
		connector.store(unit);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasUnit", unit);
	}
	

	public async getUnit(): Promise<(IUnit & Semanticable) | undefined>
	 {
		let result: (IUnit & Semanticable) | undefined = undefined;
		const property = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasUnit");
		if (property) {
			const semanticObject: Semanticable | undefined = await connector.fetch(property);
			if (semanticObject) result = <(IUnit & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setVatRate(vatRate: number): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATrate", vatRate);
	}
	

	public setValue(value: number): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#value", value);
	}
	

	public getValue(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#value");
	}
	

	public getVatRate(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATrate");
	}
	

}
