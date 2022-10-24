import Agent from "./Agent.js"
import IPerson from "./IPerson.js"
import Onboardable from "./Onboardable.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"



export default class Person extends Agent implements IPerson {

	private firstName: string;
	private lastName: string;
	private affiliatedOrganizations: (Onboardable & Semanticable)[];

	constructor(firstName: string, lastName: string) {
		super();
		this.setSemanticType("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Person");
		this.firstName = firstName;
		this.lastName = lastName;
		this.affiliatedOrganizations = [];
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasFirstName", () => this.getFirstName());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasLastName", () => this.getLastName());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#affiliatedBy", () => this.getAffiliatedOrganizations());
	}
	

	getFirstName(): string {
		return this.firstName;
	}
	

	setLastName(lastName: string): void {
		this.lastName = lastName;
	}
	

	setFirstName(firstName: string): void {
		this.firstName = firstName;
	}
	

	getLastName(): string {
		return this.lastName;
	}
	
	leaveAffiliatedOrganization(organization: (Onboardable & Semanticable)): void {
	}
	

	getAffiliatedOrganizations(): IterableIterator<(Onboardable & Semanticable)> {
		return this.affiliatedOrganizations.values();
	}
	

	affiliateTo(organization: (Onboardable & Semanticable)): void {
		this.affiliatedOrganizations.push(organization);
	}
	

}
