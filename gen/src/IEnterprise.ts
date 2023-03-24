import Describable from "./Describable.js"
import CatalogMaintainer from "./CatalogMaintainer.js"
import ProductSupplier from "./ProductSupplier.js"
import CatalogItemManager from "./CatalogItemManager.js"
import Taxable from "./Taxable.js"
import Onboardable from "./Onboardable.js"
import TechnicalProductProposer from "./TechnicalProductProposer.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IEnterprise extends CatalogMaintainer, Describable, Onboardable, CatalogItemManager, Taxable, TechnicalProductProposer, ProductSupplier {


}
