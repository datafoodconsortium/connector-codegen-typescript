import Catalogable from "./Catalogable.js"
import IEnterprise from "./IEnterprise.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Browsable {

	getMaintainers(): Promise<Array<(IEnterprise & Semanticable)>>
	;
	getItems(): Promise<Array<(Catalogable & Semanticable)>>
	;
	removeItem(item: (Catalogable & Semanticable)): void;
	addItem(item: (Catalogable & Semanticable)): void;
	addMaintainer(maintainer: (IEnterprise & Semanticable)): void;

}
