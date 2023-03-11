import Browsable from "./Browsable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Catalogable {

	getCatalogs(): Promise<Array<(Browsable & Semanticable)>>
	;
	registerInCatalog(repository: (Browsable & Semanticable)): void;

}
