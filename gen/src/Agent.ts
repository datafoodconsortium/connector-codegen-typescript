import Contactable from "./Contactable.js"
import Localizable from "./Localizable.js"
import Identifiable from "./Identifiable.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"

export default abstract class Agent extends SemanticObject implements Identifiable {

	private contacts: (Contactable & Semanticable)[];
	private localizations: (Localizable & Semanticable)[];

	constructor() {
		super();
		this.setSemanticType("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Agent");
		
		this.contacts = [];
		this.localizations = [];
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAddress", () => this.getLocalizations());
	}
	

	addLocalization(localization: (Localizable & Semanticable)): void {
		this.localizations.push(localization);
	}
	

	addContact(contact: (Contactable & Semanticable)): void {
		this.contacts.push(contact);
	}
	

	getLocalizations(): IterableIterator<(Localizable & Semanticable)> {
		return this.localizations.values();
	}
	

	getContacts(): IterableIterator<(Contactable & Semanticable)> {
		return this.contacts.values();
	}
	

	removeLocalization(localization: (Localizable & Semanticable)): void {
	}
	

	removeContact(contact: (Contactable & Semanticable)): void {
	}
	

}
