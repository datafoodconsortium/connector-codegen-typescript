import Claimable from "./Claimable.js"
import IProductType from "./IProductType.js"
import Nameable from "./Nameable.js"
import Certifiable from "./Certifiable.js"
import Quantifiable from "./Quantifiable.js"
import Manufacturable from "./Manufacturable.js"
import Describable from "./Describable.js"
import Proposable from "./Proposable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IDefinedProduct extends Manufacturable, Describable, Certifiable, Proposable, Nameable {

	addClaim(claim: (Claimable & Semanticable)): void;
	getQuantity(): Promise<(Quantifiable & Semanticable) | undefined>
	;
	setQuantity(quantity: (Quantifiable & Semanticable)): void;
	getClaims(): Promise<Array<(Claimable & Semanticable)>>
	;
	getProductType(): Promise<(IProductType & Semanticable) | undefined>
	;
	setProductType(productType: (IProductType & Semanticable)): void;
	removeClaim(claim: (Claimable & Semanticable)): void;

}
