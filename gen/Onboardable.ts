import ICustomerCategory from "./ICustomerCategory.js"


export default interface Onboardable {

	getCustomerCategories(): (ICustomerCategory & SemanticObject)[];
	addCustomerCategory(customerCategory: (ICustomerCategory & SemanticObject)): void;

}
