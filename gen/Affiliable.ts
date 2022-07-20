import Onboardable from "./Onboardable.js"


export default interface Affiliable {

	getAffiliatedOrganizations(): (Onboardable & SemanticObject)[];
	affiliateTo(organization: (Onboardable & SemanticObject)): void;
	leaveAffiliatedOrganization(organization: (Onboardable & SemanticObject)): void;

}
