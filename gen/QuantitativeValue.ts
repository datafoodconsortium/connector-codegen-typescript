import Quantifiable from "./Quantifiable.js"


export default class QuantitativeValue implements Quantifiable {

	private quantityUnit: string;
	private quantityValue: number;

	constructor(quantityUnit: string, quantityValue: number) {
		
		this.quantityUnit = quantityUnit;
		this.quantityValue = quantityValue;
		
	}

	setQuantityUnit(quantityUnit: string): void {
		this.quantityUnit = quantityUnit;
	}

	getQuantityUnit(): string {
		return this.quantityUnit;
	}

	setQuantityValue(quantityValue: number): void {
		this.quantityValue = quantityValue;
	}

	getQuantityValue(): number {
		return this.quantityValue;
	}

}
