import Quantifiable from "./Quantifiable.js"


export default interface Measurable {

	getQuantityDimension(): string;
	setQuantityDimension(quantityDimension: string): void;

}
