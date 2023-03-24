import Offerable from "./Offerable.js"
import Catalogable from "./Catalogable.js"
import Stockable from "./Stockable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface ICatalogItem extends Offerable, Stockable, Catalogable {

	getSku(): string
	;
	setSku(sku: string): void;

}
