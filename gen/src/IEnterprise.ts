import Taxable from "./Taxable.js"
import CatalogItemManager from "./CatalogItemManager.js"
import Onboardable from "./Onboardable.js"
import ProductSupplier from "./ProductSupplier.js"
import CatalogMaintainer from "./CatalogMaintainer.js"
import Describable from "./Describable.js"
import TechnicalProductProposer from "./TechnicalProductProposer.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IEnterprise extends Describable, Taxable, CatalogMaintainer, CatalogItemManager, Onboardable, ProductSupplier, TechnicalProductProposer {


}
