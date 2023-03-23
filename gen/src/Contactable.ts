import Localizable from "./Localizable.js"
import Emailable from "./Emailable.js"
import Dialable from "./Dialable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Contactable {

	getContactName(): string
	;
	getPostalAddresses(): Promise<Array<(Localizable & Semanticable)>>
	;
	getPhoneNumbers(): Promise<Array<(Dialable & Semanticable)>>
	;
	getEmailAddresses(): Promise<Array<(Emailable & Semanticable)>>
	;
	addPostalAddress(postalAddress: (Localizable & Semanticable)): void;
	addPhoneNumber(phoneNumber: (Dialable & Semanticable)): void;
	addEmailAddress(emailAddress: (Emailable & Semanticable)): void;
	removePostalAddress(postalAddress: (Localizable & Semanticable)): void;
	removePhoneNumber(phoneNumber: (Dialable & Semanticable)): void;
	removeEmailAddress(emailAddress: (Emailable & Semanticable)): void;
	setContactName(contactName: string): void;

}
