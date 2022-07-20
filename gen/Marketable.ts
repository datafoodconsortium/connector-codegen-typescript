import ICustomerCategory from "./ICustomerCategory.js"
import ICatalogItem from "./ICatalogItem.js"


export default interface Marketable {

	getOfferedItem(): (ICatalogItem & SemanticObject);
	getCustomerCategory(): (ICustomerCategory & SemanticObject);

}
