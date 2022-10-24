import Nameable from "./Nameable.js"
import Supplier from "./Supplier.js"
import Onboardable from "./Onboardable.js"
import Describable from "./Describable.js"
import Taxable from "./Taxable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IEnterprise extends Supplier, Taxable, Describable, Nameable, Onboardable {


}
