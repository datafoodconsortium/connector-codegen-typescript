/*
 * MIT License
 * 
 * Copyright (c) 2023 Maxime Lecoq <maxime@lecoqlibre.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

import Agent from "./Agent.js"
import ICatalog from "./ICatalog.js"
import Localizable from "./Localizable.js"
import ITechnicalProduct from "./ITechnicalProduct.js"
import ICatalogItem from "./ICatalogItem.js"
import IEnterprise from "./IEnterprise.js"
import Onboardable from "./Onboardable.js"
import SuppliedProduct from "./SuppliedProduct.js"
import ICustomerCategory from "./ICustomerCategory.js"
import ProductSupplier from "./ProductSupplier.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import IConnector from "./IConnector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class Enterprise extends Agent implements ProductSupplier, IEnterprise, Onboardable {
	

	public constructor(parameters: {connector: IConnector, doNotStore?: boolean, semanticId?: string, other?: Semanticable, localizations?: (Localizable & Semanticable)[], description?: string, vatNumber?: string, customerCategories?: (ICustomerCategory & Semanticable)[], catalogs?: (ICatalog & Semanticable)[], catalogItems?: (ICatalogItem & Semanticable)[], suppliedProducts?: (SuppliedProduct & Semanticable)[], technicalProducts?: (ITechnicalProduct & Semanticable)[]}) {
		const type: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Enterprise";
		
		if (parameters.other) {
			super({ connector: parameters.connector, semanticId: parameters.semanticId!, other: parameters.other });
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ connector: parameters.connector, semanticId: parameters.semanticId!, semanticType: type, localizations: parameters.localizations });
		
		
		
		
		if (!parameters.doNotStore)
			this.connector.store(this);
		if (parameters.description) this.setDescription(parameters.description);
		if (parameters.vatNumber) this.setVatNumber(parameters.vatNumber);
		if (parameters.customerCategories) parameters.customerCategories.forEach(e => this.addCustomerCategory(e));
		if (parameters.catalogs) parameters.catalogs.forEach(e => this.maintainCatalog(e));
		if (parameters.catalogItems) parameters.catalogItems.forEach(e => this.manageCatalogItem(e));
		if (parameters.suppliedProducts) parameters.suppliedProducts.forEach(e => this.supplyProduct(e));
		if (parameters.technicalProducts) parameters.technicalProducts.forEach(e => this.proposeTechnicalProducts(e));
	}

	public unsupplyProduct(suppliedProduct: (SuppliedProduct & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getSuppliedProducts(options?: IGetterOptions): Promise<Array<(SuppliedProduct & Semanticable)>>
	 {
		const results = new Array<(SuppliedProduct & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#supplies");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(SuppliedProduct & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public supplyProduct(suppliedProduct: (SuppliedProduct & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#supplies";
		if (suppliedProduct.isSemanticObjectAnonymous()) {
			if (suppliedProduct.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, suppliedProduct);
			else this.addSemanticPropertyReference(property, suppliedProduct);
		}
		else {
			this.connector.store(suppliedProduct);
			this.addSemanticPropertyReference(property, suppliedProduct);
		}
	}
	
	public async getManagedCatalogItems(options?: IGetterOptions): Promise<Array<(ICatalogItem & Semanticable)>>
	 {
		const results = new Array<(ICatalogItem & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#manages");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(ICatalogItem & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public manageCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#manages";
		if (catalogItem.isSemanticObjectAnonymous()) {
			if (catalogItem.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, catalogItem);
			else this.addSemanticPropertyReference(property, catalogItem);
		}
		else {
			this.connector.store(catalogItem);
			this.addSemanticPropertyReference(property, catalogItem);
		}
	}
	

	public unmanageCatalogItem(catalogItem: (ICatalogItem & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	
	public setDescription(description: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasDescription";
		this.setSemanticPropertyLiteral(property, description);
	}
	

	public getDescription(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasDescription");
	}
	
	public getVatNumber(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATnumber");
	}
	

	public setVatNumber(vatNumber: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATnumber";
		this.setSemanticPropertyLiteral(property, vatNumber);
	}
	
	public addCustomerCategory(customerCategory: (ICustomerCategory & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#defines";
		if (customerCategory.isSemanticObjectAnonymous()) {
			if (customerCategory.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, customerCategory);
			else this.addSemanticPropertyReference(property, customerCategory);
		}
		else {
			this.connector.store(customerCategory);
			this.addSemanticPropertyReference(property, customerCategory);
		}
	}
	

	public async getCustomerCategories(options?: IGetterOptions): Promise<Array<(ICustomerCategory & Semanticable)>>
	 {
		const results = new Array<(ICustomerCategory & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#defines");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(ICustomerCategory & Semanticable)> semanticObject);
		}
		return results;
	}
	
	public unmaintainCatalog(catalog: (ICatalog & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public maintainCatalog(catalog: (ICatalog & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#maintains";
		if (catalog.isSemanticObjectAnonymous()) {
			if (catalog.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, catalog);
			else this.addSemanticPropertyReference(property, catalog);
		}
		else {
			this.connector.store(catalog);
			this.addSemanticPropertyReference(property, catalog);
		}
	}
	

	public async getMaintainedCatalogs(options?: IGetterOptions): Promise<Array<(ICatalog & Semanticable)>>
	 {
		const results = new Array<(ICatalog & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#maintains");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(ICatalog & Semanticable)> semanticObject);
		}
		return results;
	}
	
	public unproposeTechnicalProducts(technicalProducts: (ITechnicalProduct & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getProposedTechnicalProducts(options?: IGetterOptions): Promise<Array<(ITechnicalProduct & Semanticable)>>
	 {
		const results = new Array<(ITechnicalProduct & Semanticable)>();
		const properties = this.getSemanticPropertyAll("");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(ITechnicalProduct & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public proposeTechnicalProducts(technicalProducts: (ITechnicalProduct & Semanticable)): void {
		const property: string = "";
		if (technicalProducts.isSemanticObjectAnonymous()) {
			if (technicalProducts.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, technicalProducts);
			else this.addSemanticPropertyReference(property, technicalProducts);
		}
		else {
			this.connector.store(technicalProducts);
			this.addSemanticPropertyReference(property, technicalProducts);
		}
	}
	

}
