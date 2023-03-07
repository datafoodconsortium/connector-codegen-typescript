import Catalogable from "./Catalogable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Browsable {

	getMaintainers(): Promise<Array<(Catalogable & Semanticable)>>
	;
	getListedItems(): Promise<Array<(Catalogable & Semanticable)>>
	;

}
