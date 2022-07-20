import NutrientCharacteristic from "./NutrientCharacteristic.js"
import PhysicalCharacteristic from "./PhysicalCharacteristic.js"
import Claimable from "./Claimable.js"
import AllergenCharacteristic from "./AllergenCharacteristic.js"


export default interface Manufacturable {

	getAlcoholPercentage(): number;
	getLifetime(): string;
	getClaims(): (Claimable & SemanticObject)[];
	getUsageOrStorageConditions(): string;
	getAllergenCharacteristics(): (AllergenCharacteristic & SemanticObject)[];
	getNutrientCharacteristics(): (NutrientCharacteristic & SemanticObject)[];
	getPhysicalCharacteristics(): (PhysicalCharacteristic & SemanticObject)[];
	getGeographicalOrigin(): number;
	addClaim(claim: (Claimable & SemanticObject)): void;
	addAllergenCharacteristic(allergenCharacteristic: (AllergenCharacteristic & SemanticObject)): void;
	addNutrientCharacteristic(nutrientCharacteristic: (NutrientCharacteristic & SemanticObject)): void;
	addPhysicalCharacteristic(physicalCharacteristic: (PhysicalCharacteristic & SemanticObject)): void;

}
