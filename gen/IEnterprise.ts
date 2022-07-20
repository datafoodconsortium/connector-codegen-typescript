import Describable from "./Describable.js"
import Nameable from "./Nameable.js"
import Onboardable from "./Onboardable.js"
import Supplier from "./Supplier.js"
import Taxable from "./Taxable.js"


export default interface IEnterprise extends Taxable, Nameable, Describable, Onboardable, Supplier {


}
