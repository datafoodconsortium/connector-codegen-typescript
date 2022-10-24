import Quantifiable from "./Quantifiable.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"

export default class QuantitativeValue extends SemanticObject implements Quantifiable {

	private quantityUnit: string;
	private quantityValue: number;

	constructor(quantityUnit: string, quantityValue: number) {
		super();
		this.setSemanticType("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#QuantitativeValue");
		this.quantityUnit = quantityUnit;
		this.quantityValue = quantityValue;
		
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasUnit", () => this.getQuantityUnit());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#value", () => this.getQuantityValue());
	}
	

	setQuantityValue(quantityValue: number): void {
		this.quantityValue = quantityValue;
	}
	

	getQuantityValue(): number {
		return this.quantityValue;
	}
	

	getQuantityUnit(): string {
		return this.quantityUnit;
	}
	

	setQuantityUnit(quantityUnit: string): void {
		this.quantityUnit = quantityUnit;
	}
	

}
