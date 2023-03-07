import Localizable from "./Localizable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Identifiable {

	/* Returns the different localizations of the subject. */
	getLocalizations(): Promise<Array<(Localizable & Semanticable)>>
	;
	addLocalization(localization: (Localizable & Semanticable)): void;
	removeLocalization(localization: (Localizable & Semanticable)): void;

}
