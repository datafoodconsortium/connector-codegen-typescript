import IOffer from "./IOffer.js"
import IDefinedProduct from "./IDefinedProduct.js"
import ICatalogItem from "./ICatalogItem.js"




export default class CatalogItem implements ICatalogItem {

	private product: (IDefinedProduct & SemanticObject);
	private sku: string;
	private stockLimitation: number;
	private offers: (IOffer & SemanticObject)[];

	constructor(product: (IDefinedProduct & SemanticObject)) {
		
		this.product = product;
		this.sku = "";
		this.stockLimitation = 0.0;
		this.offers = [];
	}

	getSku(): string {
		return this.sku;
	}

	getOfferers(): (IOffer & SemanticObject)[] {
		return this.offers;
	}

	getOfferedProduct(): (IDefinedProduct & SemanticObject) {
		return this.product;
	}

	getStockLimitation(): number {
		return this.stockLimitation;
	}

	addOffer(offer: (IOffer & SemanticObject)): void {
		this.offers.push(offer);
	}

}
