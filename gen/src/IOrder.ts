import ISaleSession from "./ISaleSession.js"
import Agent from "./Agent.js"
import IOrderLine from "./IOrderLine.js"

import { Semanticable } from "@virtual-assembly/semantizer"
import IGetterOptions from "./IGetterOptions.js";

export default interface IOrder extends Semanticable {

	getNumber(): string
	;
	getDate(): string
	;
	getSaleSession(): Promise<(ISaleSession & Semanticable) | undefined>
	;
	getClient(): Promise<(Agent & Semanticable) | undefined>
	;
	getLines(options?: IGetterOptions): Promise<Array<(IOrderLine & Semanticable)>>
	;
	setNumber(number: string): void;
	setDate(date: string): void;
	setSaleSession(saleSession: (ISaleSession & Semanticable)): void;
	setClient(client: (Agent & Semanticable)): void;
	addLine(line: (IOrderLine & Semanticable)): void;

}
