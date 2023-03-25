import Stockable from "./Stockable.js"
import Catalogable from "./Catalogable.js"
import Offerable from "./Offerable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface ICatalogItem extends Semanticable, Offerable, Catalogable, Stockable{

	getSku(): string
	;
	setSku(sku: string): void;

}
