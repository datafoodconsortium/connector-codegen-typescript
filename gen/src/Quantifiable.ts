import IUnit from "./IUnit.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Quantifiable {

	getQuantityUnit(): Promise<(IUnit & Semanticable) | undefined>
	;
	getQuantityValue(): number
	;
	setQuantityUnit(quantityUnit: (IUnit & Semanticable)): void;
	setQuantityValue(quantityValue: number): void;

}
