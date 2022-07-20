import ICustomerCategory from "./ICustomerCategory.js"





export default class CustomerCategory implements ICustomerCategory {

	private name: string;
	private description: string;

	constructor(name: string, description: string) {
		
		this.name = name;
		this.description = description;
		
	}

	getName(): string {
		return this.name;
	}

	getDescription(): string {
		return this.description;
	}

}
