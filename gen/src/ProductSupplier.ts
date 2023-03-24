import ICatalogItem from "./ICatalogItem.js"
import SuppliedProduct from "./SuppliedProduct.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface ProductSupplier {

	getSuppliedProducts(): Promise<Array<(SuppliedProduct & Semanticable)>>
	;
	supplyProduct(suppliedProduct: (SuppliedProduct & Semanticable)): void;
	unsupplyProduct(suppliedProduct: (SuppliedProduct & Semanticable)): void;

}
