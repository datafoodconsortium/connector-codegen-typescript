import IUnit from "./IUnit.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IPrice {

	getValue(): number
	;
	getVatRate(): number
	;
	getUnit(): Promise<(IUnit & Semanticable) | undefined>
	;

}