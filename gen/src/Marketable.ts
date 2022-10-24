import ICatalogItem from "./ICatalogItem.js"
import ICustomerCategory from "./ICustomerCategory.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Marketable {

	getOfferedItem(): (ICatalogItem & Semanticable) | undefined;
	getCustomerCategory(): (ICustomerCategory & Semanticable);

}
