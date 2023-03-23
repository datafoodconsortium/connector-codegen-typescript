import ICatalogItem from "./ICatalogItem.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface CatalogItemManager {

	getManagedCatalogItems(): Promise<Array<(ICatalogItem & Semanticable)>>
	;
	manageCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void;
	unmanageCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void;

}
