import Identifiable from "./Identifiable.js"
import Localizable from "./Localizable.js"
import Contactable from "./Contactable.js"
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
	

	addContact(contact: (Contactable & Semanticable)): void {
		this.contacts.push(contact);
	}
	

	getContacts(): IterableIterator<(Contactable & Semanticable)> {
		return this.contacts.values();
	}
	

	removeContact(contact: (Contactable & Semanticable)): void {
	}
	

	getLocalizations(): IterableIterator<(Localizable & Semanticable)> {
		return this.localizations.values();
	}
	

	addLocalization(localization: (Localizable & Semanticable)): void {
		this.localizations.push(localization);
	}
	

	removeLocalization(localization: (Localizable & Semanticable)): void {
	}
	

}
