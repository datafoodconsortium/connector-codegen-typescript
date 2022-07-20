import IOffer from "./IOffer.js"
import ICatalogItem from "./ICatalogItem.js"
import ICustomerCategory from "./ICustomerCategory.js"





export default class Offer implements IOffer {

	private price: number;
	private stockLimitation: number;
	private offeredItem: (ICatalogItem & SemanticObject);
	private offeredTo: (ICustomerCategory & SemanticObject);

	constructor(offeredItem: (ICatalogItem & SemanticObject), offeredTo: (ICustomerCategory & SemanticObject)) {
		
		this.offeredItem = offeredItem;
		this.offeredTo = offeredTo;
		this.price = 0.0;
		this.stockLimitation = 0.0;
	}

	getOfferedItem(): (ICatalogItem & SemanticObject) {
		return this.offeredItem;
	}

	getPrice(): number {
		return this.price;
	}

	getCustomerCategory(): (ICustomerCategory & SemanticObject) {
		return this.offeredTo;
	}

	getStockLimitation(): number {
		return this.stockLimitation;
	}

}
