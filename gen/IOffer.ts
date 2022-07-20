import Marketable from "./Marketable.js"
import Payable from "./Payable.js"
import Stockable from "./Stockable.js"


export default interface IOffer extends Payable, Marketable, Stockable {


}
