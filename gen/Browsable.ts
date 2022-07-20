import Catalogable from "./Catalogable.js"


export default interface Browsable {

	getMaintainers(): (Catalogable & SemanticObject)[];
	getListedItems(): (Catalogable & SemanticObject)[];

}
