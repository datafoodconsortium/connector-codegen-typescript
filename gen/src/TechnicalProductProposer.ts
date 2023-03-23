import ITechnicalProduct from "./ITechnicalProduct.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface TechnicalProductProposer {

	getProposedTechnicalProducts(): Promise<Array<(ITechnicalProduct & Semanticable)>>
	;
	proposeTechnicalProducts(technicalProducts: (ITechnicalProduct & Semanticable)): void;
	unproposeTechnicalProducts(technicalProducts: (ITechnicalProduct & Semanticable)): void;

}
