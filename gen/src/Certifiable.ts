import ICertification from "./ICertification.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Certifiable {

	addCertification(certification: (ICertification & Semanticable)): void;
	getCertifications(): Promise<Array<(ICertification & Semanticable)>>
	;
	removeCertification(certification: (ICertification & Semanticable)): void;

}
