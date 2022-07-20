import Browsable from "./Browsable.js"


export default interface Catalogable {

	getRepository(): (Browsable & SemanticObject);

}
