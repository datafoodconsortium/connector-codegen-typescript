import Offerable from "./Offerable.js"
import Stockable from "./Stockable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface ICatalogItem extends Stockable, Offerable {

	getSku(): string
	;
	setSku(sku: string): void;

}
