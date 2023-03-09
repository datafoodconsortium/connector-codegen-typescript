import Describable from "./Describable.js"
import Onboardable from "./Onboardable.js"
import Supplier from "./Supplier.js"
import Taxable from "./Taxable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IEnterprise extends Taxable, Onboardable, Describable, Supplier {


}
