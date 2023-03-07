import Marketable from "./Marketable.js"
import Payable from "./Payable.js"
import Stockable from "./Stockable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IOffer extends Stockable, Payable, Marketable {


}
