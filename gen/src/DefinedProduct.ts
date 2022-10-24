import ICatalogItem from "./ICatalogItem.js"
import IDefinedProduct from "./IDefinedProduct.js"
import ICertification from "./ICertification.js"
import Quantifiable from "./Quantifiable.js"
import IAllergenCharacteristic from "./IAllergenCharacteristic.js"
import INutrientCharacteristic from "./INutrientCharacteristic.js"
import INatureOrigin from "./INatureOrigin.js"
import IPhysicalCharacteristic from "./IPhysicalCharacteristic.js"
import IGeographicalOrigin from "./IGeographicalOrigin.js"
import IProductType from "./IProductType.js"
import IPartOrigin from "./IPartOrigin.js"
import Claimable from "./Claimable.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"






export default abstract class DefinedProduct extends SemanticObject implements IDefinedProduct {

	private name: string;
	private description: string;
	private productType: (IProductType & Semanticable) | undefined;
	private quantity: (Quantifiable & Semanticable) | undefined;
	private alcoholPercentage: number;
	private lifetime: string;
	private claims: (Claimable & Semanticable)[];
	private usageOrStorageConditions: string;
	private allergenCharacteristics: (IAllergenCharacteristic & Semanticable)[];
	private nutrientCharacteristics: (INutrientCharacteristic & Semanticable)[];
	private physicalCharacteristics: (IPhysicalCharacteristic & Semanticable)[];
	private geographicalOrigin: (IGeographicalOrigin & Semanticable) | undefined;
	private catalogItems: (ICatalogItem & Semanticable)[];
	private certifications: (ICertification & Semanticable)[];
	private natureOrigin: (INatureOrigin & Semanticable)[];
	private partOrigin: (IPartOrigin & Semanticable)[];

	constructor(name: string, description: string) {
		super();
		this.setSemanticType("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#DefinedProduct");
		this.name = name;
		this.description = description;
		this.productType = undefined;
		this.quantity = undefined;
		this.alcoholPercentage = 0.0;
		this.lifetime = "";
		this.claims = [];
		this.usageOrStorageConditions = "";
		this.allergenCharacteristics = [];
		this.nutrientCharacteristics = [];
		this.physicalCharacteristics = [];
		this.geographicalOrigin = undefined;
		this.catalogItems = [];
		this.certifications = [];
		this.natureOrigin = [];
		this.partOrigin = [];
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#name", () => this.getName());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#description", () => this.getDescription());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasType", () => this.getProductType());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasQuantity", () => this.getQuantity());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#alcoholPercentage", () => this.getAlcoholPercentage());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lifetime", () => this.getLifetime());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasClaim", () => this.getClaims());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#usageOrStorageCondition", () => this.getUsageOrStorageConditions());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAllergenCharacteristic", () => this.getAllergenCharacteristics());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNutrientCharacteristic", () => this.getNutrientCharacteristics());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPhysicalCharacteristic", () => this.getPhysicalCharacteristics());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasGeographicalOrigin", () => this.getGeographicalOrigin());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#referencedBy", () => this.getCatalogItems());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCertification", () => this.getCertifications());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasNatureOrigin", () => this.getNatureOrigin());
		this.registerSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPartOrigin", () => this.getPartOrigin());
	}
	

	getCertifications(): IterableIterator<(ICertification & Semanticable)> {
		return this.certifications.values();
	}
	

	addCertification(certification: (ICertification & Semanticable)): void {
		this.certifications.push(certification);
	}
	
	getDescription(): string {
		return this.description;
	}
	
	getClaims(): IterableIterator<(Claimable & Semanticable)> {
		return this.claims.values();
	}
	

	setProductType(productType: (IProductType & Semanticable)): void {
		this.productType = productType;
	}
	

	addClaim(claim: (Claimable & Semanticable)): void {
		this.claims.push(claim);
	}
	

	getQuantity(): (Quantifiable & Semanticable) | undefined {
		return this.quantity;
	}
	

	setQuantity(quantity: (Quantifiable & Semanticable)): void {
		this.quantity = quantity;
	}
	

	getProductType(): (IProductType & Semanticable) | undefined {
		return this.productType;
	}
	
	addCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void {
		this.catalogItems.push(catalogItem);
	}
	

	getCatalogItems(): IterableIterator<(ICatalogItem & Semanticable)> {
		return this.catalogItems.values();
	}
	
	getAllergenCharacteristics(): IterableIterator<(IAllergenCharacteristic & Semanticable)> {
		return this.allergenCharacteristics.values();
	}
	

	addNutrientCharacteristic(nutrientCharacteristic: (INutrientCharacteristic & Semanticable)): void {
		this.nutrientCharacteristics.push(nutrientCharacteristic);
	}
	

	addAllergenCharacteristic(allergenCharacteristic: (IAllergenCharacteristic & Semanticable)): void {
		this.allergenCharacteristics.push(allergenCharacteristic);
	}
	

	getPhysicalCharacteristics(): IterableIterator<(IPhysicalCharacteristic & Semanticable)> {
		return this.physicalCharacteristics.values();
	}
	

	getPartOrigin(): IterableIterator<(IPartOrigin & Semanticable)> {
		return this.partOrigin.values();
	}
	

	addPhysicalCharacteristic(physicalCharacteristic: (IPhysicalCharacteristic & Semanticable)): void {
		this.physicalCharacteristics.push(physicalCharacteristic);
	}
	

	addNatureOrigin(natureOrigin: (INatureOrigin & Semanticable)): void {
		this.natureOrigin.push(natureOrigin);
	}
	

	getAlcoholPercentage(): number {
		return this.alcoholPercentage;
	}
	

	getLifetime(): string {
		return this.lifetime;
	}
	

	getNutrientCharacteristics(): IterableIterator<(INutrientCharacteristic & Semanticable)> {
		return this.nutrientCharacteristics.values();
	}
	

	getUsageOrStorageConditions(): string {
		return this.usageOrStorageConditions;
	}
	

	getGeographicalOrigin(): (IGeographicalOrigin & Semanticable) | undefined {
		return this.geographicalOrigin;
	}
	

	getNatureOrigin(): IterableIterator<(INatureOrigin & Semanticable)> {
		return this.natureOrigin.values();
	}
	

	addPartOrigin(partOrigin: (IPartOrigin & Semanticable)): void {
		this.partOrigin.push(partOrigin);
	}
	

	setGeographicalOrigin(geographicalOrigin: (IGeographicalOrigin & Semanticable)): void {
		this.geographicalOrigin = geographicalOrigin;
	}
	
	getName(): string {
		return this.name;
	}
	

}
