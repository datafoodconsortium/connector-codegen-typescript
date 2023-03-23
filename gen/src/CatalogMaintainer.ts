import ICatalog from "./ICatalog.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface CatalogMaintainer {

	getMaintainedCatalogs(): Promise<Array<(ICatalog & Semanticable)>>
	;
	maintainCatalog(catalog: (ICatalog & Semanticable)): void;
	unmaintainCatalog(catalog: (ICatalog & Semanticable)): void;

}
