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
import IAllergenDimension from "./IAllergenDimension.js"
import IUnit from "./IUnit.js"
import ICharacteristicDimension from "./ICharacteristicDimension.js"
import IAllergenCharacteristic from "./IAllergenCharacteristic.js"
import { SemanticObjectAnonymous } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import IConnector from "./IConnector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class AllergenCharacteristic extends Characteristic implements IAllergenCharacteristic {
	

	public constructor(parameters: {connector: IConnector, semanticId?: string, semanticType?: string, other?: Semanticable, unit?: (IUnit & Semanticable), value?: number, allergenDimension?: (IAllergenDimension & Semanticable)}) {
		const type: string = parameters.semanticType? parameters.semanticType: "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#AllergenCharacteristic";
		
		if (parameters.other) {
			super({ connector: parameters.connector, semanticId: parameters.semanticId!, other: parameters.other });
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ connector: parameters.connector, semanticId: parameters.semanticId!, semanticType: type, unit: parameters.unit, value: parameters.value });
		
		
		
		
		if (parameters.allergenDimension) this.setQuantityDimension(parameters.allergenDimension);
	}

	public async getQuantityDimension(options?: IGetterOptions): Promise<(ICharacteristicDimension & Semanticable) | undefined>
	 {
		let result: (ICharacteristicDimension & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAllergenDimension");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) result = <(ICharacteristicDimension & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setQuantityDimension(quantityDimension: (ICharacteristicDimension & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAllergenDimension";
		this.setSemanticPropertyReference(property, quantityDimension);
		this.connector.store(quantityDimension);
	}
	


}
