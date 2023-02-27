import SuppliedProduct from "./SuppliedProduct.js"
import ICatalogItem from "./ICatalogItem.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Supplier {

	getSuppliedProducts(): IterableIterator<(SuppliedProduct & Semanticable)>;
	getCatalogItems(): IterableIterator<(ICatalogItem & Semanticable)>;
	addSupplyProduct(suppliedProduct: (SuppliedProduct & Semanticable)): void;
	addCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void;

}
