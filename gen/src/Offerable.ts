import IOffer from "./IOffer.js"
import IDefinedProduct from "./IDefinedProduct.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Offerable {

	getOfferers(): Promise<Array<(IOffer & Semanticable)>>
	;
	getOfferedProduct(): Promise<(IDefinedProduct & Semanticable) | undefined>
	;
	addOffer(offer: (IOffer & Semanticable)): void;
	setOfferedProduct(offeredProduct: (IDefinedProduct & Semanticable)): void;

}
