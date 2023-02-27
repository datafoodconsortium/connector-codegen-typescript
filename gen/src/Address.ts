import Localizable from "./Localizable.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"

export default class Address extends SemanticObject implements Localizable {

	private street: string;
	private postalCode: string;
	private city: string;
	private country: string;

	constructor(street: string, postalCode: string, city: string, country: string) {
		super();
		this.setSemanticType("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Address");
		this.street = street;
		this.postalCode = postalCode;
		this.city = city;
		this.country = country;
		
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasStreet", () => this.getStreet());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPostalCode", () => this.getPostalCode());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCity", () => this.getCity());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCountry", () => this.getCountry());
	}
	

	getCity(): string {
		return this.city;
	}
	

	setCity(city: string): void {
		this.city = city;
	}
	

	setCountry(country: string): void {
		this.country = country;
	}
	

	getPostalCode(): string {
		return this.postalCode;
	}
	

	setPostalCode(postalCode: string): void {
		this.postalCode = postalCode;
	}
	

	getCountry(): string {
		return this.country;
	}
	

	setStreet(street: string): void {
		this.street = street;
	}
	

	getStreet(): string {
		return this.street;
	}
	

}
