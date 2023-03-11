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

import INutrientCharacteristic from "./INutrientCharacteristic.js"
import Characteristic from "./Characteristic.js"
import INutrientDimension from "./INutrientDimension.js"
import IUnit from "./IUnit.js"
import ICharacteristicDimension from "./ICharacteristicDimension.js"
import { SemanticObjectAnonymous } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class NutrientCharacteristic extends Characteristic implements INutrientCharacteristic {

	public constructor(parameters: {semanticId?: string, semanticType?: string, unit?: (IUnit & Semanticable), value?: number, nutrientDimension?: (INutrientDimension & Semanticable)});
	public constructor(parameters: {other: Semanticable, unit?: (IUnit & Semanticable), value?: number, nutrientDimension?: (INutrientDimension & Semanticable)});
	public constructor(parameters: {semanticId?: string, semanticType?: string, other?: Semanticable, unit?: (IUnit & Semanticable), value?: number, nutrientDimension?: (INutrientDimension & Semanticable)}) {
		super({semanticId: parameters.semanticId, semanticType: parameters.other? parameters.other.getSemanticType(): parameters.semanticType, other: parameters.other, unit: parameters.unit, value: parameters.value});
		
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.nutrientDimension) this.setQuantityDimension(parameters.nutrientDimension);
	}

	public async getQuantityDimension(options?: IGetterOptions): Promise<(ICharacteristicDimension & Semanticable) | undefined>
	 {
		let result: (ICharacteristicDimension & Semanticable) | undefined = undefined;
		const semanticId = this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNutrientDimension");
		if (semanticId) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) result = <(ICharacteristicDimension & Semanticable) | undefined> semanticObject;
		}
		return result;
		
	}
	

	public setQuantityDimension(quantityDimension: (ICharacteristicDimension & Semanticable)): void {
		connector.store(quantityDimension);
		this.setSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNutrientDimension", quantityDimension);
	}
	


}
