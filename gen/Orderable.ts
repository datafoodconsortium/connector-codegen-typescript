import Invoiceable from "./Invoiceable.js"


export default interface Orderable {

	getCustomer(): (Invoiceable & SemanticObject);

}
