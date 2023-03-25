import IClaim from "./IClaim.js"
import Certifiable from "./Certifiable.js"
import IProductType from "./IProductType.js"
import Nameable from "./Nameable.js"
import IQuantity from "./IQuantity.js"
import Describable from "./Describable.js"
import Proposable from "./Proposable.js"
import Manufacturable from "./Manufacturable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IDefinedProduct extends Semanticable, Certifiable, Nameable, Manufacturable, Describable, Proposable{

	addClaim(claim: IClaim): void;
	getQuantity(): Promise<IQuantity | undefined>
	;
	setQuantity(quantity: IQuantity): void;
	getClaims(): Promise<Array<IClaim>>
	;
	getProductType(): Promise<IProductType | undefined>
	;
	setProductType(productType: IProductType): void;
	removeClaim(claim: IClaim): void;

}
