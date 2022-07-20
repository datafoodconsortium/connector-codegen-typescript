import IOffer from "./IOffer.js"
import IDefinedProduct from "./IDefinedProduct.js"


export default interface Offerable {

	getOfferers(): (IOffer & SemanticObject)[];
	getOfferedProduct(): (IDefinedProduct & SemanticObject);
	addOffer(offer: (IOffer & SemanticObject)): void;

}
