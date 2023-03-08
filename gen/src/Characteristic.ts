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

import ICharacteristicDimension from "./ICharacteristicDimension.js"
import QuantitativeValue from "./QuantitativeValue.js"
import IUnit from "./IUnit.js"
import ICharacteristic from "./ICharacteristic.js"
import { SemanticObjectAnonymous } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import Connector from "./Connector.js"

export default abstract class Characteristic extends QuantitativeValue implements ICharacteristic {

	protected constructor(parameters: {semanticType?: string, other?: Semanticable, unit?: (IUnit & Semanticable), value?: number}) {
		super({semanticType: parameters.other? parameters.other.getSemanticType(): parameters.semanticType!, unit: parameters.unit, value: parameters.value});
		
		
	}

	abstract getQuantityDimension(): Promise<(ICharacteristicDimension & Semanticable) | undefined>
	

	abstract setQuantityDimension(quantityDimension: (ICharacteristicDimension & Semanticable)): void


}
