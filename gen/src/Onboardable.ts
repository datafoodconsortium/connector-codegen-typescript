import ICustomerCategory from "./ICustomerCategory.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Onboardable {

	getCustomerCategories(): Promise<Array<(ICustomerCategory & Semanticable)>>
	;
	addCustomerCategory(customerCategory: (ICustomerCategory & Semanticable)): void;

}
