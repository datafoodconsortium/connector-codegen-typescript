import ICatalogItem from "./ICatalogItem.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Proposable {

	getCatalogItems(): Promise<Array<(ICatalogItem & Semanticable)>>
	;
	addCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void;

}
