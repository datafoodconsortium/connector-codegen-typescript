import ICatalogItem from "./ICatalogItem.js"
import SuppliedProduct from "./SuppliedProduct.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface ProductSupplier {

	getSuppliedProducts(): Promise<Array<SuppliedProduct>>
	;
	supplyProduct(suppliedProduct: SuppliedProduct): void;
	unsupplyProduct(suppliedProduct: SuppliedProduct): void;

}
