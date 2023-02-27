import ICatalogItem from "./ICatalogItem.js"
import Agent from "./Agent.js"
import IEnterprise from "./IEnterprise.js"
import SuppliedProduct from "./SuppliedProduct.js"
import ICustomerCategory from "./ICustomerCategory.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"






export default class Enterprise extends Agent implements IEnterprise {

	private name: string;
	private description: string;
	private vatNumber: string;
	private customerCategories: (ICustomerCategory & Semanticable)[];
	private suppliedProducts: (SuppliedProduct & Semanticable)[];
	private catalogItems: (ICatalogItem & Semanticable)[];
	private solidThing: object = {};

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
	
	getSolidThing(): void {
		// 1. Itérer sur les propriétés 
		// 2. extraire le type de chaque propriété
		// 3. addType en fonction du type de la propriété
		// Note : cela peut être fait depuis l'extérieur du prototype 
		// sur tous les Semanticable
		return new Thing(this.name);
	}

	getCustomerCategories(): IterableIterator<(ICustomerCategory & Semanticable)> {
		return this.customerCategories.values();
	}
	

	addCustomerCategory(customerCategory: (ICustomerCategory & Semanticable)): void {
		this.customerCategories.push(customerCategory);
	}
	
	getDescription(): string {
		return this.description;
	}
	

	setDescription(description: string): void {
		this.description = description;
	}
	
	getVatNumber(): string {
		return this.vatNumber;
	}
	

	setVatNumber(vatNumber: string): void {
		this.vatNumber = vatNumber;
	}
	
	getCatalogItems(): IterableIterator<(ICatalogItem & Semanticable)> {
		return this.catalogItems.values();
	}
	

	getSuppliedProducts(): IterableIterator<(SuppliedProduct & Semanticable)> {
		return this.suppliedProducts.values();
	}
	

	addSupplyProduct(suppliedProduct: (SuppliedProduct & Semanticable)): void {
		this.suppliedProducts.push(suppliedProduct);
	}
	

	addCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void {
		this.catalogItems.push(catalogItem);
	}
	
	getName(): string {
		return this.name;
	}
	

	setName(name: string): void {
		this.name = name;
	}
	

}
