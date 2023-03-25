import { Semanticable } from "@virtual-assembly/semantizer"
import DatasetExt from "rdf-ext/lib/Dataset";
import ConnectorExporterJsonldStream from "./ConnectorExporterJsonldStream.js";
import ConnectorImporterJsonldStream from "./ConnectorImporterJsonldStream.js";
import ConnectorStoreMap from "./ConnectorStoreMap.js";
import IConnectorExporter from "./IConnectorExporter";
import IConnectorFactory from "./IConnectorFactory.js";
import IConnectorImporter from "./IConnectorImporter";
import IConnectorStore from "./IConnectorStore";
import IGetterOptions from "./IGetterOptions.js";
import ISKOSConcept from "./ISKOSConcept";
import context from "./context.js";
import IConnectorImportOptions from "./IConnectorImportOptions.js";
import IConnectorExportOptions from "./IConnectorExportOptions.js";
import ConnectorFactory from "./ConnectorFactory.js";
import IConnector from "./IConnector.js";
import IAddress from "./IAddress.js";
import ICatalog from "./ICatalog.js";
import ICatalogItem from "./ICatalogItem.js";
import ICustomerCategory from "./ICustomerCategory.js";
import IEnterprise from "./IEnterprise.js";
import INutrientCharacteristic from "./INutrientCharacteristic.js";
import IAllergenCharacteristic from "./IAllergenCharacteristic.js";
import IOffer from "./IOffer.js";
import IOrder from "./IOrder.js";
import IOrderLine from "./IOrderLine.js";
import IPerson from "./IPerson.js";
import IPhysicalCharacteristic from "./IPhysicalCharacteristic.js";
import IPrice from "./IPrice.js";
import IQuantity from "./IQuantity.js";
import ISaleSession from "./ISaleSession.js";
import ISuppliedProduct from "./ISuppliedProduct.js";
import IAllergenDimension from "./IAllergenDimension.js";
import IUnit from "./IUnit.js";
import INutrientDimension from "./INutrientDimension.js";
import IAgent from "./IAgent.js";
import IPhysicalDimension from "./IPhysicalDimension.js";
import IPartOrigin from "./IPartOrigin.js";
import INatureOrigin from "./INatureOrigin.js";
import ICertification from "./ICertification.js";
import IGeographicalOrigin from "./IGeographicalOrigin.js";
import IClaim from "./IClaim.js";
import IProductType from "./IProductType.js";

export default class Connector implements IConnector {

    public FACETS?: ISKOSConcept;
    public MEASURES?: ISKOSConcept;
    public PRODUCT_TYPES?: ISKOSConcept;

    private fetchFunction: (semanticId: string) => Promise<Response>;
    private factory: IConnectorFactory;
    private importer: IConnectorImporter;
    private exporter: IConnectorExporter;
    private storeObject: IConnectorStore;

    public constructor() {
        this.storeObject = new ConnectorStoreMap();
        this.fetchFunction = async (semanticId: string) => (await fetch(semanticId));
        this.factory = new ConnectorFactory(this);
        this.importer = new ConnectorImporterJsonldStream({ context: context });
        const outputContext = "http://static.datafoodconsortium.org/ontologies/context.json";
        this.exporter = new ConnectorExporterJsonldStream(context, outputContext);
    }

    public createAddress(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, street?: string, postalCode?: string, city?: string, country?: string}): IAddress {
        return this.factory.createAddress(parameters);
    }

    public createAllergenCharacteristic(parameters: {other?: Semanticable, unit?: IUnit, value?: number, allergenDimension?: IAllergenDimension}): IAllergenCharacteristic {
        return this.factory.createAllergenCharacteristic(parameters);
    }

    public createCatalog(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, maintainers?: IEnterprise[], items?: ICatalogItem[]}): ICatalog {
        return this.factory.createCatalog(parameters);
    }

    public createCatalogItem(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, product?: ISuppliedProduct, sku?: string, stockLimitation?: number, offers?: IOffer[], catalogs?: ICatalog[]}): ICatalogItem {
        return this.factory.createCatalogItem(parameters);
    }

    public createCustomerCategory(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, description?: string}): ICustomerCategory {
        return this.factory.createCustomerCategory(parameters);
    }

    public createEnterprise(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, localizations?: IAddress[], description?: string, vatNumber?: string, customerCategories?: ICustomerCategory[], catalogs?: ICatalog[], catalogItems?: ICatalogItem[], suppliedProducts?: ISuppliedProduct[]}): IEnterprise {
        return this.factory.createEnterprise(parameters);
    }

    public createNutrientCharacteristic(parameters: {other?: Semanticable, unit?: IUnit, value?: number, nutrientDimension?: INutrientDimension}): INutrientCharacteristic {
        return this.factory.createNutrientCharacteristic(parameters);
    }

    public createOffer(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, offeredItem?: ICatalogItem, offeredTo?: ICustomerCategory, price?: IPrice, stockLimitation?: number}): IOffer {
        return this.factory.createOffer(parameters);
    }

    public createOrder(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, number?: string, date?: string, saleSession?: ISaleSession, client?: IAgent, lines?: IOrderLine[]}): IOrder {
        return this.factory.createOrder(parameters);
    }

    public createOrderLine(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, quantity?: number, price?: IPrice, offer?: IOffer, order?: IOrder}): IOrderLine {
        return this.factory.createOrderLine(parameters);
    }

    public createPerson(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, firstName?: string, lastName?: string, localizations?: IAddress[], organizations?: IEnterprise[]}): IPerson {
        return this.factory.createPerson(parameters);
    }

    public createPhysicalCharacteristic(parameters: {other?: Semanticable, unit?: IUnit, value?: number, physicalDimension?: IPhysicalDimension}): IPhysicalCharacteristic {
        return this.factory.createPhysicalCharacteristic(parameters);
    }

    public createPrice(parameters: {other?: Semanticable, value?: number, vatRate?: number, unit?: IUnit}): IPrice {
        return this.factory.createPrice(parameters);
    }

    public createQuantity(parameters: {other?: Semanticable, unit?: IUnit, value?: number}): IQuantity {
        return this.factory.createQuantity(parameters);
    }

    public createSaleSession(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, beginDate?: string, endDate?: string, quantity?: number, offers?: IOffer[]}): ISaleSession {
        return this.factory.createSaleSession(parameters);
    }

    public createSuppliedProduct(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, name?: string, description?: string, productType?: IProductType, quantity?: IQuantity, alcoholPercentage?: number, lifetime?: string, claims?: IClaim[], usageOrStorageConditions?: string, allergenCharacteristics?: IAllergenCharacteristic[], nutrientCharacteristics?: INutrientCharacteristic[], physicalCharacteristics?: IPhysicalCharacteristic[], geographicalOrigin?: IGeographicalOrigin, catalogItems?: ICatalogItem[], certifications?: ICertification[], natureOrigin?: INatureOrigin[], partOrigin?: IPartOrigin[], totalTheoreticalStock?: number}): ISuppliedProduct {
        return this.factory.createSuppliedProduct(parameters);
    }

    public async export(objects: Array<Semanticable>, options?: IConnectorExportOptions): Promise<string> {
        const exporter = options?.exporter? options.exporter : this.exporter;
        return exporter.export(objects, {
            inputContext: options?.inputContext,
            outputContext: options?.outputContext
        });
    }

    public getDefaultFactory(): IConnectorFactory {
        return this.factory;
    }

    // TODO: handle only and limit optional parameters.
    public async import(data: string, options?: IConnectorImportOptions): Promise<Array<Semanticable>> {
        return new Promise(async (resolve, reject) => {
            try { 
                const importer = options?.importer? options.importer : this.importer;
                const factory = options?.factory? options.factory : this.factory;
                const results: Array<Semanticable> = new Array<Semanticable>();
                const datasets: Array<DatasetExt> = await importer.import(data, { context: options?.context });

                datasets.forEach(dataset => {
                    const semanticObject = factory.createFromRdfDataset(dataset);
                    if (semanticObject) {
                        results.push(semanticObject);
                        if (options?.doNotStore === undefined || options.doNotStore !== false)
                            this.store(semanticObject);
                        if (options && options.callbacks)
                            options.callbacks.forEach((callback: Function) => callback(semanticObject));
                    }
                });

                resolve(results);
            }
            catch(error) { reject(error) }
        });
    }

    // TODO: manage options overriding.
    private async importThesaurus(data: any, prefix: string, options?: IConnectorImportOptions): Promise<any> {
        let conceptScheme: Semanticable | undefined = undefined; 
        const concepts = new Map<string, Semanticable>();
        const context = data["@context"];
        const skos: string = "http://www.w3.org/2004/02/skos/core#";
        const skosConceptScheme: string = skos + "ConceptScheme";
        const skosHasTopConcept: string = skos + "hasTopConcept";
        const skosNarrower: string = skos + "narrower";

        const callback = (semanticObject: Semanticable) => {
            if (semanticObject.isSemanticTypeOf(skosConceptScheme)) conceptScheme = semanticObject;
            else concepts.set(semanticObject.getSemanticId(), semanticObject);
        }

        await this.import(data, { context: context, callbacks: [callback] });

        if (!conceptScheme)
            throw new Error("Can't find the SKOS ConceptScheme in the imported thesaurus.");

        const setChildren = (parent: Semanticable) => {
            const narrowers = parent.getSemanticPropertyAll(skosNarrower);

            narrowers.forEach((narrower: string) => {
                const name: string = narrower.split(prefix)[1].replace('-', '_').toUpperCase();
                const concept: Semanticable | undefined = concepts.get(narrower);
                if (concept) {
                    // @ts-ignore
                    parent[name] = concept;
                    setChildren(concept);
                }
            });
        }

        // @ts-ignore: if the conceptScheme does not exist, an exception should have be already throwned
        conceptScheme.getSemanticPropertyAll(skosHasTopConcept).forEach((topConcept: any) => {
            const name: string = topConcept.split(prefix)[1].replace('-', '_').toUpperCase();
            const concept: Semanticable | undefined = concepts.get(topConcept);
            if (!concept)
                throw new Error("The thesaurus top concept " + topConcept + " was not found.");
            // @ts-ignore
            conceptScheme[name] = concept;
            setChildren(concept);
        });

        return conceptScheme;
    }

    public async loadFacets(facets: any): Promise<void> {
        const prefix: string = "http://static.datafoodconsortium.org/data/facets.rdf#";
        this.FACETS = await this.importThesaurus(facets, prefix);
    }

    public async loadMeasures(measures: any): Promise<void> {
        const prefix: string = "http://static.datafoodconsortium.org/data/measures.rdf#";
        this.MEASURES = await this.importThesaurus(measures, prefix);
    }

    public async loadProductTypes(productTypes: any): Promise<void> {
        const prefix: string = "http://static.datafoodconsortium.org/data/productTypes.rdf#";
        this.PRODUCT_TYPES = await this.importThesaurus(productTypes, prefix);
    }

    public async fetch(semanticObjectId: string, options?: IGetterOptions): Promise<Semanticable | undefined> {
        const store: IConnectorStore = options?.store? options.store : this.storeObject;

        if (!store.has(semanticObjectId)) {
            const fetchFunction = options?.fetch? options.fetch : this.fetchFunction;
            const importer = options?.importer? { importer: options.importer } : {};
            const document: Response = await fetchFunction(semanticObjectId);
            const semanticObjects = await this.import(await document.text(), importer);
            store.setAll(semanticObjects);
            return semanticObjects.find(semanticObject => semanticObject.getSemanticId() === semanticObjectId);
        }

        return store.get(semanticObjectId);
    }

    public setDefaultFactory(factory: IConnectorFactory): void {
        this.factory = factory;
    }

    public setDefaultFetchFunction(fetch: (semanticId: string) => Promise<Response>): void {
        this.fetchFunction = fetch;
    }

    public setDefaultExporter(exporter: IConnectorExporter): void {
        this.exporter = exporter;
    }

    public setDefaultImporter(importer: IConnectorImporter): void {
        this.importer = importer;
    }

    public setDefaultStore(store: IConnectorStore): void {
        this.storeObject = store;
    }

    public store(semanticObject: Semanticable): void {
        this.storeObject.set(semanticObject);
    }
}