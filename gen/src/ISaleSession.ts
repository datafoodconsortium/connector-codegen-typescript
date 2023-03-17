import Ellapsable from "./Ellapsable.js"
import IOffer from "./IOffer.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface ISaleSession extends Ellapsable {

	getQuantity(): number
	;
	setQuantity(quantity: number): void;
	getOffers(): Promise<Array<(IOffer & Semanticable)>>
	;
	addOffer(offer: (IOffer & Semanticable)): void;

}
