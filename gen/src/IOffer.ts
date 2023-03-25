import Payable from "./Payable.js"
import Stockable from "./Stockable.js"
import Marketable from "./Marketable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IOffer extends Semanticable, Marketable, Payable, Stockable{


}
