import Measurable from "./Measurable.js"
import QuantitativeValue from "./QuantitativeValue.js"



export default abstract class Characteristic extends QuantitativeValue implements Measurable {

	private quantityDimension: string;

	constructor(quantityUnit: string, quantityValue: number, quantityDimension: string) {
		super(quantityUnit, quantityValue);
		this.quantityDimension = quantityDimension;
		
	}

	getQuantityDimension(): string {
		return this.quantityDimension;
	}

	setQuantityDimension(quantityDimension: string): void {
		this.quantityDimension = quantityDimension;
	}

}
