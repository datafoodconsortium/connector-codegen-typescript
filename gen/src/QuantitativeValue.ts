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

import Quantifiable from "./Quantifiable.js"
import IUnit from "./IUnit.js"
import { SemanticObjectAnonymous } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import Connector from "./Connector.js"

export default class QuantitativeValue extends SemanticObjectAnonymous implements Quantifiable {

	public constructor(parameters: {semanticType?: string, unit?: (IUnit & Semanticable), value?: number});
	public constructor(parameters: {other: Semanticable, unit?: (IUnit & Semanticable), value?: number});
	public constructor(parameters: {semanticType?: string, other?: Semanticable, unit?: (IUnit & Semanticable), value?: number}) {
		super(parameters.other? parameters.other.getSemanticType(): parameters.semanticType);
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.unit) this.setQuantityUnit(parameters.unit);
		if (parameters.value) this.setQuantityValue(parameters.value);
	}

	public async getQuantityUnit(): Promise<(IUnit & Semanticable) | undefined>
	 {
		let result: (IUnit & Semanticable) | undefined = undefined;
		const property = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasUnit");
		if (property) {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(property);
			if (semanticObject) result = <(IUnit & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public getQuantityValue(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#value");
	}
	

	public setQuantityUnit(quantityUnit: (IUnit & Semanticable)): void {
		Connector.getInstance().store(quantityUnit);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasUnit", quantityUnit);
	}
	

	public setQuantityValue(quantityValue: number): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#value", quantityValue);
	}
	

}
