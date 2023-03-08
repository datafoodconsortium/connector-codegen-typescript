import Stockable from "./Stockable.js"
import Payable from "./Payable.js"
import Marketable from "./Marketable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IOffer extends Payable, Stockable, Marketable {


}
