import ISKOSConcept from "./ISKOSConcept.js"
import ISKOSLabel from "./ISKOSLabel.js"
import ISKOSConceptScheme from "./ISKOSConceptScheme.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"

export default class SKOSConcept extends SemanticObject implements ISKOSConcept {

	private broaders: (ISKOSConcept & Semanticable)[];
	private schemes: (ISKOSConceptScheme & Semanticable)[];
	private narrowers: (ISKOSConcept & Semanticable)[];
	private prefLabels: (ISKOSLabel & Semanticable)[];

	constructor() {
		super();
		this.setSemanticType("http://www.w3.org/2004/02/skos/core#Concept");
		
		this.broaders = [];
		this.schemes = [];
		this.narrowers = [];
		this.prefLabels = [];
		this.registerSemanticProperty("http://www.w3.org/2004/02/skos/core#broader", () => this.getBroader());
		this.registerSemanticProperty("http://www.w3.org/2004/02/skos/core#inScheme", () => this.getScheme());
		this.registerSemanticProperty("http://www.w3.org/2004/02/skos/core#narrower", () => this.getNarrower());
		this.registerSemanticProperty("http://www.w3.org/2004/02/skos/core#prefLabel", () => this.getPrefLabel());
	}
	

	removeScheme(scheme: (ISKOSConceptScheme & Semanticable)): void {
	}
	

	getScheme(): IterableIterator<(ISKOSConceptScheme & Semanticable)> {
		return this.schemes.values();
	}
	

	addScheme(scheme: (ISKOSConceptScheme & Semanticable)): void {
		this.schemes.push(scheme);
	}
	

	removePrefLabel(prefLabel: (ISKOSLabel & Semanticable)): void {
	}
	

	removeBroader(broader: (ISKOSConcept & Semanticable)): void {
	}
	

	addPrefLabel(prefLabel: (ISKOSLabel & Semanticable)): void {
		this.prefLabels.push(prefLabel);
	}
	

	getBroader(): IterableIterator<(ISKOSConcept & Semanticable)> {
		return this.broaders.values();
	}
	

	removeNarrower(narrower: (ISKOSConcept & Semanticable)): void {
	}
	

	getPrefLabel(): IterableIterator<(ISKOSLabel & Semanticable)> {
		return this.prefLabels.values();
	}
	

	addBroader(broader: (ISKOSConcept & Semanticable)): void {
		this.broaders.push(broader);
	}
	

	getNarrower(): IterableIterator<(ISKOSConcept & Semanticable)> {
		return this.narrowers.values();
	}
	

	addNarrower(narrower: (ISKOSConcept & Semanticable)): void {
		this.narrowers.push(narrower);
	}
	

}
