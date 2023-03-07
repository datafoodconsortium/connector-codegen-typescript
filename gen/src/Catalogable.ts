import Browsable from "./Browsable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Catalogable {

	getRepository(): Promise<(Browsable & Semanticable) | undefined>
	;

}
