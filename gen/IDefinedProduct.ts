import Proposable from "./Proposable.js"
import Nameable from "./Nameable.js"
import Manufacturable from "./Manufacturable.js"
import Describable from "./Describable.js"


export default interface IDefinedProduct extends Manufacturable, Proposable, Describable, Nameable {


}
