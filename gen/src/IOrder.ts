import IOrderLine from "./IOrderLine.js"
import Agent from "./Agent.js"
import ISaleSession from "./ISaleSession.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IOrder extends Semanticable{

	getNumber(): string
	;
	getDate(): string
	;
	getSaleSession(): Promise<ISaleSession | undefined>
	;
	getClient(): Promise<Agent | undefined>
	;
	getLines(): Promise<Array<IOrderLine>>
	;
	setNumber(number: string): void;
	setDate(date: string): void;
	setSaleSession(saleSession: ISaleSession): void;
	setClient(client: Agent): void;
	addLine(line: IOrderLine): void;

}
