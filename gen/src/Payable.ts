import IPrice from "./IPrice.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Payable {

	getPrice(): Promise<(IPrice & Semanticable) | undefined>
	;
	setPrice(price: (IPrice & Semanticable)): void;

}
