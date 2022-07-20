import ICatalogItem from "./ICatalogItem.js"


export default interface Proposable {

	getCatalogItems(): (ICatalogItem & SemanticObject)[];
	addCatalogItem(catalogItem: (ICatalogItem & SemanticObject)): void;

}
