import IOffer from "./IOffer.js"
import ICatalogItem from "./ICatalogItem.js"
import ICustomerCategory from "./ICustomerCategory.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"




export default class Offer extends SemanticObject implements IOffer {

	private price: number;
	private stockLimitation: number;
	private offeredItem: (ICatalogItem & Semanticable) | undefined;
	private offeredTo: (ICustomerCategory & Semanticable);

	constructor(offeredItem: (ICatalogItem & Semanticable), offeredTo: (ICustomerCategory & Semanticable)) {
		super();
		this.setSemanticType("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Offer");
		this.offeredItem = offeredItem;
		this.offeredTo = offeredTo;
		this.price = 0.0;
		this.stockLimitation = 0.0;
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#price", () => this.getPrice());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation", () => this.getStockLimitation());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredItem", () => this.getOfferedItem());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredTo", () => this.getCustomerCategory());
	}
	

	getCustomerCategory(): (ICustomerCategory & Semanticable) {
		return this.offeredTo;
	}
	

	getOfferedItem(): (ICatalogItem & Semanticable) | undefined {
		return this.offeredItem;
	}
	
	getPrice(): number {
		return this.price;
	}
	
	getStockLimitation(): number {
		return this.stockLimitation;
	}
	

}
