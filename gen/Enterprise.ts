import Agent from "./Agent.js"
import ICatalogItem from "./ICatalogItem.js"
import IEnterprise from "./IEnterprise.js"
import SuppliedProduct from "./SuppliedProduct.js"
import ICustomerCategory from "./ICustomerCategory.js"







export default class Enterprise extends Agent implements IEnterprise {

	private name: string;
	private description: string;
	private vatNumber: string;
	private customerCategories: (ICustomerCategory & SemanticObject)[];
	private suppliedProducts: (SuppliedProduct & SemanticObject)[];
	private catalogItems: (ICatalogItem & SemanticObject)[];

	constructor(name: string) {
		super();
		this.name = name;
		this.description = "";
		this.vatNumber = "";
		this.customerCategories = [];
		this.suppliedProducts = [];
		this.catalogItems = [];
	}

	addSupplyProduct(suppliedProduct: (SuppliedProduct & SemanticObject)): void {
		this.suppliedProducts.push(suppliedProduct);
	}

	addCatalogItem(catalogItem: (ICatalogItem & SemanticObject)): void {
		this.catalogItems.push(catalogItem);
	}

	getDescription(): string {
		return this.description;
	}

	getName(): string {
		return this.name;
	}

	getVatNumber(): string {
		return this.vatNumber;
	}

	getCustomerCategories(): (ICustomerCategory & SemanticObject)[] {
		return this.customerCategories;
	}

	getSuppliedProducts(): (SuppliedProduct & SemanticObject)[] {
		return this.suppliedProducts;
	}

	addCustomerCategory(customerCategory: (ICustomerCategory & SemanticObject)): void {
		this.customerCategories.push(customerCategory);
	}

	getCatalogItems(): (ICatalogItem & SemanticObject)[] {
		return this.catalogItems;
	}

}
