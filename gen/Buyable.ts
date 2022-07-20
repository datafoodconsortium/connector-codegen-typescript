import Marketable from "./Marketable.js"


export default interface Buyable {

	getBuyableOffer(): (Marketable & SemanticObject);

}
