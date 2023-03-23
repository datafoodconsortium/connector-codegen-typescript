import IOrderLine from "./IOrderLine.js"
import Agent from "./Agent.js"
import ISaleSession from "./ISaleSession.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IOrder {

	getNumber(): string
	;
	getDate(): string
	;
	getSaleSession(): Promise<(ISaleSession & Semanticable) | undefined>
	;
	getClient(): Promise<(Agent & Semanticable) | undefined>
	;
	getLines(): Promise<Array<(IOrderLine & Semanticable)>>
	;
	setNumber(number: string): void;
	setDate(date: string): void;
	setSaleSession(saleSession: (ISaleSession & Semanticable)): void;
	setClient(client: (Agent & Semanticable)): void;
	addLine(line: (IOrderLine & Semanticable)): void;

}
