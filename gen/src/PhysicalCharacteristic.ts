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

import Characteristic from "./Characteristic.js"
import IPhysicalCharacteristic from "./IPhysicalCharacteristic.js"
import IUnit from "./IUnit.js"
import IPhysicalDimension from "./IPhysicalDimension.js"
import ICharacteristicDimension from "./ICharacteristicDimension.js"
import { SemanticObjectAnonymous } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js"

export default class PhysicalCharacteristic extends Characteristic implements IPhysicalCharacteristic {

	public constructor(parameters: {unit?: (IUnit & Semanticable), value?: number, physicalDimension?: (IPhysicalDimension & Semanticable)});
	public constructor(parameters: {other: Semanticable, unit?: (IUnit & Semanticable), value?: number, physicalDimension?: (IPhysicalDimension & Semanticable)});
	public constructor(parameters: {semanticType?: string, other?: Semanticable, unit?: (IUnit & Semanticable), value?: number, physicalDimension?: (IPhysicalDimension & Semanticable)}) {
		super({semanticType: parameters.other? parameters.other.getSemanticType(): parameters.semanticType, unit: parameters.unit, value: parameters.value});
		
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.physicalDimension) this.setQuantityDimension(parameters.physicalDimension);
	}

	public async getQuantityDimension(): Promise<(ICharacteristicDimension & Semanticable) | undefined>
	 {
		let result: (ICharacteristicDimension & Semanticable) | undefined = undefined;
		const property = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPhysicalDimension");
		if (property) {
			const semanticObject: Semanticable | undefined = await connector.fetch(property);
			if (semanticObject) result = <(ICharacteristicDimension & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setQuantityDimension(quantityDimension: (ICharacteristicDimension & Semanticable)): void {
		connector.store(quantityDimension);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPhysicalDimension", quantityDimension);
	}
	


}
