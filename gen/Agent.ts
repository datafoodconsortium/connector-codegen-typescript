import Identifiable from "./Identifiable.js"
import Localizable from "./Localizable.js"
import Contactable from "./Contactable.js"


export default abstract class Agent implements Identifiable {

	private contacts: (Contactable & SemanticObject)[];
	private localizations: (Localizable & SemanticObject)[];

	constructor() {
		
		
		this.contacts = [];
		this.localizations = [];
	}

	addLocalization(localization: (Localizable & SemanticObject)): void {
		this.localizations.push(localization);
	}

	removeContact(contact: (Contactable & SemanticObject)): void {
	}

	getContacts(): (Contactable & SemanticObject)[] {
		return this.contacts;
	}

	getLocalizations(): (Localizable & SemanticObject)[] {
		return this.localizations;
	}

	removeLocalization(localization: (Localizable & SemanticObject)): void {
	}

	addContact(contact: (Contactable & SemanticObject)): void {
		this.contacts.push(contact);
	}

}
