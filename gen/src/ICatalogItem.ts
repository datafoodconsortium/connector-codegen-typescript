import Offerable from "./Offerable.js"
import Stockable from "./Stockable.js"
import Catalogable from "./Catalogable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface ICatalogItem extends Offerable, Stockable, Catalogable {

	getSku(): string
	;
	setSku(sku: string): void;

}
