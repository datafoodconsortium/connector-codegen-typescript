import SuppliedProduct from "./SuppliedProduct.js"
import ICustomerCategory from "./ICustomerCategory.js"
import ICatalogItem from "./ICatalogItem.js"
import Agent from "./Agent.js"
import IEnterprise from "./IEnterprise.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"






export default class Enterprise extends Agent implements IEnterprise {

	private name: string;
	private description: string;
	private vatNumber: string;
	private customerCategories: (ICustomerCategory & Semanticable)[];
	private suppliedProducts: (SuppliedProduct & Semanticable)[];
	private catalogItems: (ICatalogItem & Semanticable)[];

	constructor(name: string) {
		super();
		this.setSemanticType("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Enterprise");
		this.name = name;
		this.description = "";
		this.vatNumber = "";
		this.customerCategories = [];
		this.suppliedProducts = [];
		this.catalogItems = [];
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasName", () => this.getName());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasDescription", () => this.getDescription());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATnumber", () => this.getVatNumber());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#defines", () => this.getCustomerCategories());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#supplies", () => this.getSuppliedProducts());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#manages", () => this.getCatalogItems());
	}
	

	getCustomerCategories(): IterableIterator<(ICustomerCategory & Semanticable)> {
		return this.customerCategories.values();
	}
	

	addCustomerCategory(customerCategory: (ICustomerCategory & Semanticable)): void {
		this.customerCategories.push(customerCategory);
	}
	
	getVatNumber(): string {
		return this.vatNumber;
	}
	
	getDescription(): string {
		return this.description;
	}
	
	getCatalogItems(): IterableIterator<(ICatalogItem & Semanticable)> {
		return this.catalogItems.values();
	}
	

	addSupplyProduct(suppliedProduct: (SuppliedProduct & Semanticable)): void {
		this.suppliedProducts.push(suppliedProduct);
	}
	

	addCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void {
		this.catalogItems.push(catalogItem);
	}
	

	getSuppliedProducts(): IterableIterator<(SuppliedProduct & Semanticable)> {
		return this.suppliedProducts.values();
	}
	
	getName(): string {
		return this.name;
	}
	

}
