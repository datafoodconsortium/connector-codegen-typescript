import IPartOrigin from "./IPartOrigin.js"
import IGeographicalOrigin from "./IGeographicalOrigin.js"
import IAllergenCharacteristic from "./IAllergenCharacteristic.js"
import INutrientCharacteristic from "./INutrientCharacteristic.js"
import INatureOrigin from "./INatureOrigin.js"
import IPhysicalCharacteristic from "./IPhysicalCharacteristic.js"

import { Semanticable } from "@virtual-assembly/semantizer"

export default interface Manufacturable {

	getAlcoholPercentage(): number
	;
	getLifetime(): string
	;
	getUsageOrStorageConditions(): string
	;
	getAllergenCharacteristics(): Promise<Array<(IAllergenCharacteristic & Semanticable)>>
	;
	getNutrientCharacteristics(): Promise<Array<(INutrientCharacteristic & Semanticable)>>
	;
	getPhysicalCharacteristics(): Promise<Array<(IPhysicalCharacteristic & Semanticable)>>
	;
	getGeographicalOrigin(): Promise<(IGeographicalOrigin & Semanticable) | undefined>
	;
	getNatureOrigin(): Promise<Array<(INatureOrigin & Semanticable)>>
	;
	getPartOrigin(): Promise<Array<(IPartOrigin & Semanticable)>>
	;
	setGeographicalOrigin(geographicalOrigin: (IGeographicalOrigin & Semanticable)): void;
	setAlcoholPercentage(alcoholPercentage: number): void;
	setLifetime(lifetime: string): void;
	setUsageOrStorageConditions(usageOrStorageConditions: string): void;
	addAllergenCharacteristic(allergenCharacteristic: (IAllergenCharacteristic & Semanticable)): void;
	addNutrientCharacteristic(nutrientCharacteristic: (INutrientCharacteristic & Semanticable)): void;
	addPhysicalCharacteristic(physicalCharacteristic: (IPhysicalCharacteristic & Semanticable)): void;
	addNatureOrigin(natureOrigin: (INatureOrigin & Semanticable)): void;
	addPartOrigin(partOrigin: (IPartOrigin & Semanticable)): void;
	removeAllergenCharacteristic(allergenCharacteristic: (IAllergenCharacteristic & Semanticable)): void;
	removeNutrientCharacteristic(nutrientCharacteristic: (INutrientCharacteristic & Semanticable)): void;
	removePhysicalCharacteristic(physicalCharacteristic: (IPhysicalCharacteristic & Semanticable)): void;
	removeNatureOrigin(natureOrigin: (INatureOrigin & Semanticable)): void;
	removePartOrigin(partOrigin: (IPartOrigin & Semanticable)): void;

}
