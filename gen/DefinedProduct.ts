import PhysicalCharacteristic from "./PhysicalCharacteristic.js"
import IDefinedProduct from "./IDefinedProduct.js"
import NutrientCharacteristic from "./NutrientCharacteristic.js"
import AllergenCharacteristic from "./AllergenCharacteristic.js"
import ICatalogItem from "./ICatalogItem.js"
import Claimable from "./Claimable.js"






export default abstract class DefinedProduct implements IDefinedProduct {

	private name: string;
	private description: string;
	private alcoholPercentage: number;
	private lifetime: string;
	private claims: (Claimable & SemanticObject)[];
	private usageOrStorageConditions: string;
	private allergenCharacteristics: (AllergenCharacteristic & SemanticObject)[];
	private nutrientCharacteristics: (NutrientCharacteristic & SemanticObject)[];
	private physicalCharacteristics: (PhysicalCharacteristic & SemanticObject)[];
	private geographicalOrigin: number;
	private catalogItems: (ICatalogItem & SemanticObject)[];

	constructor(name: string, description: string) {
		
		this.name = name;
		this.description = description;
		this.alcoholPercentage = 0.0;
		this.lifetime = "";
		this.claims = [];
		this.usageOrStorageConditions = "";
		this.allergenCharacteristics = [];
		this.nutrientCharacteristics = [];
		this.physicalCharacteristics = [];
		this.geographicalOrigin = 0;
		this.catalogItems = [];
	}

	getNutrientCharacteristics(): (NutrientCharacteristic & SemanticObject)[] {
		return this.nutrientCharacteristics;
	}

	getGeographicalOrigin(): number {
		return this.geographicalOrigin;
	}

	addClaim(claim: (Claimable & SemanticObject)): void {
		this.claims.push(claim);
	}

	getName(): string {
		return this.name;
	}

	getUsageOrStorageConditions(): string {
		return this.usageOrStorageConditions;
	}

	addAllergenCharacteristic(allergenCharacteristic: (AllergenCharacteristic & SemanticObject)): void {
		this.allergenCharacteristics.push(allergenCharacteristic);
	}

	getAlcoholPercentage(): number {
		return this.alcoholPercentage;
	}

	getPhysicalCharacteristics(): (PhysicalCharacteristic & SemanticObject)[] {
		return this.physicalCharacteristics;
	}

	getClaims(): (Claimable & SemanticObject)[] {
		return this.claims;
	}

	addPhysicalCharacteristic(physicalCharacteristic: (PhysicalCharacteristic & SemanticObject)): void {
		this.physicalCharacteristics.push(physicalCharacteristic);
	}

	getLifetime(): string {
		return this.lifetime;
	}

	getAllergenCharacteristics(): (AllergenCharacteristic & SemanticObject)[] {
		return this.allergenCharacteristics;
	}

	addNutrientCharacteristic(nutrientCharacteristic: (NutrientCharacteristic & SemanticObject)): void {
		this.nutrientCharacteristics.push(nutrientCharacteristic);
	}

	getDescription(): string {
		return this.description;
	}

	addCatalogItem(catalogItem: (ICatalogItem & SemanticObject)): void {
		this.catalogItems.push(catalogItem);
	}

	getCatalogItems(): (ICatalogItem & SemanticObject)[] {
		return this.catalogItems;
	}

}
