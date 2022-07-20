import IPerson from "./IPerson.js"
import Agent from "./Agent.js"
import Onboardable from "./Onboardable.js"




export default class Person extends Agent implements IPerson {

	private firstName: string;
	private lastName: string;
	private affiliatedOrganizations: (Onboardable & SemanticObject)[];

	constructor(firstName: string, lastName: string) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.affiliatedOrganizations = [];
	}

	setLastName(lastName: string): void {
		this.lastName = lastName;
	}

	getLastName(): string {
		return this.lastName;
	}

	getFirstName(): string {
		return this.firstName;
	}

	getAffiliatedOrganizations(): (Onboardable & SemanticObject)[] {
		return this.affiliatedOrganizations;
	}

	affiliateTo(organization: (Onboardable & SemanticObject)): void {
		this.affiliatedOrganizations.push(organization);
	}

	setFirstName(firstName: string): void {
		this.firstName = firstName;
	}

	leaveAffiliatedOrganization(organization: (Onboardable & SemanticObject)): void {
	}

}
