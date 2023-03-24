import Quantifiable from "./Quantifiable.js"
import ICharacteristicDimension from "./ICharacteristicDimension.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Measurable {

	getQuantityDimension(): Promise<(ICharacteristicDimension & Semanticable) | undefined>
	;
	setQuantityDimension(quantityDimension: (ICharacteristicDimension & Semanticable)): void;

}
