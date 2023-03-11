import Marketable from "./Marketable.js"
import Stockable from "./Stockable.js"
import Payable from "./Payable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IOffer extends Payable, Marketable, Stockable {


}
