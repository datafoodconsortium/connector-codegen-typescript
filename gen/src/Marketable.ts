import ICustomerCategory from "./ICustomerCategory.js"
import ICatalogItem from "./ICatalogItem.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Marketable {

	getOfferedItem(): Promise<(ICatalogItem & Semanticable) | undefined>
	;
	getCustomerCategory(): Promise<(ICustomerCategory & Semanticable) | undefined>
	;
	setOfferedItem(offeredItem: (ICatalogItem & Semanticable)): void;
	setCustomerCategory(customerCategory: (ICustomerCategory & Semanticable)): void;

}
