import Onboardable from "./Onboardable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Affiliable {

	getAffiliatedOrganizations(): Promise<Array<(Onboardable & Semanticable)>>
	;
	affiliateTo(organization: (Onboardable & Semanticable)): void;
	leaveAffiliatedOrganization(organization: (Onboardable & Semanticable)): void;

}
