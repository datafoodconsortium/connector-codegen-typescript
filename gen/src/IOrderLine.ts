import IPrice from "./IPrice.js"
import Describable from "./Describable.js"
import IOrder from "./IOrder.js"
import IOffer from "./IOffer.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IOrderLine extends Describable {

	getQuantity(): number
	;
	getPrice(): Promise<(IPrice & Semanticable) | undefined>
	;
	getOffer(): Promise<(IOffer & Semanticable) | undefined>
	;
	getOrder(): Promise<(IOrder & Semanticable) | undefined>
	;
	setQuantity(quantity: number): void;
	setPrice(price: (IPrice & Semanticable)): void;
	setOffer(offer: (IOffer & Semanticable)): void;
	setOrder(order: (IOrder & Semanticable)): void;

}
