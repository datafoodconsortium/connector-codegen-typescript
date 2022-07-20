import Orderable from "./Orderable.js"


export default interface Invoiceable {

	getOrders(): (Orderable & SemanticObject)[];

}
