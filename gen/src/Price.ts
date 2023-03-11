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
import IUnit from "./IUnit.js"
import { SemanticObjectAnonymous } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class Price extends SemanticObjectAnonymous implements IPrice {

	public constructor(parameters: {semanticId?: string, semanticType?: string, value?: number, vatRate?: number, unit?: (IUnit & Semanticable)});
	public constructor(parameters: {semanticId: string, other: Semanticable});
	public constructor(parameters: {semanticId?: string, semanticType?: string, other?: Semanticable, value?: number, vatRate?: number, unit?: (IUnit & Semanticable)}) {
		const type: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Price";
		
		if (parameters.other) {
			super({ semanticId: parameters.semanticId!, other: parameters.other })
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ semanticId: parameters.semanticId!, semanticType: type });
		
		
		if (parameters.value) this.setValue(parameters.value);
		if (parameters.vatRate) this.setVatRate(parameters.vatRate);
		if (parameters.unit) this.setUnit(parameters.unit);
	}

	public getVatRate(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATrate");
	}
	

	public async getUnit(options?: IGetterOptions): Promise<(IUnit & Semanticable) | undefined>
	 {
		let result: (IUnit & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasUnit");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) result = <(IUnit & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setValue(value: number): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#value";
		this.setSemanticPropertyLiteral(property, value);
	}
	

	public getValue(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#value");
	}
	

	public setUnit(unit: (IUnit & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasUnit";
		if (unit.isSemanticObjectAnonymous()) {
			if (unit.hasSemanticPropertiesOtherThanType()) this.setSemanticPropertyAnonymous(property, unit);
			else this.setSemanticPropertyReference(property, unit);
		}
		else {
			connector.store(unit);
			this.setSemanticPropertyReference(property, unit);
		}
	}
	

	public setVatRate(vatRate: number): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATrate";
		this.setSemanticPropertyLiteral(property, vatRate);
	}
	

}
