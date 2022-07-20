import ICatalogItem from "./ICatalogItem.js"
import SuppliedProduct from "./SuppliedProduct.js"


export default interface Supplier {

	getSuppliedProducts(): (SuppliedProduct & SemanticObject)[];
	getCatalogItems(): (ICatalogItem & SemanticObject)[];
	addSupplyProduct(suppliedProduct: (SuppliedProduct & SemanticObject)): void;
	addCatalogItem(catalogItem: (ICatalogItem & SemanticObject)): void;

}
