import Stockable from "./Stockable.js"
import Catalogable from "./Catalogable.js"
import Offerable from "./Offerable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface ICatalogItem extends Stockable, Offerable, Catalogable {

	getSku(): string
	;
	setSku(sku: string): void;

}
