import Quantifiable from "./Quantifiable.js"
import Certifiable from "./Certifiable.js"
import IProductType from "./IProductType.js"
import Manufacturable from "./Manufacturable.js"
import Nameable from "./Nameable.js"
import Proposable from "./Proposable.js"
import Claimable from "./Claimable.js"
import Describable from "./Describable.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IDefinedProduct extends Manufacturable, Proposable, Nameable, Describable, Certifiable {

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
