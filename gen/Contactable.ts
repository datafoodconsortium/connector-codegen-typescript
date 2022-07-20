import Localizable from "./Localizable.js"
import Emailable from "./Emailable.js"
import Dialable from "./Dialable.js"


export default interface Contactable {

	getContactName(): string;
	getPostalAddresses(): (Localizable & SemanticObject)[];
	getPhoneNumbers(): (Dialable & SemanticObject)[];
	getEmailAddresses(): (Emailable & SemanticObject)[];
	addPostalAddress(postalAddress: (Localizable & SemanticObject)): void;
	addPhoneNumber(phoneNumber: (Dialable & SemanticObject)): void;
	addEmailAddress(emailAddress: (Emailable & SemanticObject)): void;
	removePostalAddress(postalAddress: (Localizable & SemanticObject)): void;
	removePhoneNumber(phoneNumber: (Dialable & SemanticObject)): void;
	removeEmailAddress(emailAddress: (Emailable & SemanticObject)): void;
	setContactName(contactName: string): void;

}
