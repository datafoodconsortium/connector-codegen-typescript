import Quantifiable from "./Quantifiable.js"
import ICharacteristicDimension from "./ICharacteristicDimension.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Measurable {

	getQuantityDimension(): Promise<ICharacteristicDimension | undefined>
	;
	setQuantityDimension(quantityDimension: ICharacteristicDimension): void;

}
