import Catalogable from "./Catalogable.js"
import Stockable from "./Stockable.js"
import Offerable from "./Offerable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface ICatalogItem extends Catalogable, Stockable, Offerable {

	getSku(): string
	;
	setSku(sku: string): void;

}
