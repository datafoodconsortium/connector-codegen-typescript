import Localizable from "./Localizable.js"
import Contactable from "./Contactable.js"


export default interface Identifiable {

	getContacts(): (Contactable & SemanticObject)[];
	getLocalizations(): (Localizable & SemanticObject)[];
	addContact(contact: (Contactable & SemanticObject)): void;
	addLocalization(localization: (Localizable & SemanticObject)): void;
	removeContact(contact: (Contactable & SemanticObject)): void;
	removeLocalization(localization: (Localizable & SemanticObject)): void;

}
