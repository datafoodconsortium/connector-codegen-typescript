
import { Semanticable } from "@virtual-assembly/semantizer"
import DatasetExt from "rdf-ext/lib/Dataset";
import ConnectorExporterJsonldStream from "./ConnectorExporterJsonldStream.js";
import ConnectorFactoryDefault from "./ConnectorFactoryDefault.js";
import ConnectorImporterJsonldStream from "./ConnectorImporterJsonldStream.js";
import ConnectorStoreMap from "./ConnectorStoreMap.js";
import IConnectorExporter from "./IConnectorExporter";
import IConnectorFactory from "./IConnectorFactory.js";
import IConnectorImporter from "./IConnectorImporter";
import IConnectorStore from "./IConnectorStore";
import IGetterOptions from "./IGetterOptions.js";
import ISKOSConcept from "./ISKOSConcept";
import SKOSParser from "./SKOSParser.js";
import context from "./context.js";
import Localizable from "./Localizable.js";

export default class Connector {

    public FACETS: Array<ISKOSConcept>;
    public MEASURES: Array<ISKOSConcept>;
    public PRODUCT_TYPES: Array<ISKOSConcept>;

    private fetchFunction: Function;
    private factory: IConnectorFactory;
    private importer: IConnectorImporter;
    private exporter: IConnectorExporter;
    private storeObject: IConnectorStore;

    private parser: SKOSParser;

    public constructor() {
        this.storeObject = new ConnectorStoreMap();
        this.fetchFunction = async (semanticId: string) => (await fetch(semanticId)).json;
        this.factory = new ConnectorFactoryDefault();
        this.importer = new ConnectorImporterJsonldStream(context);
        this.exporter = new ConnectorExporterJsonldStream(context); //{ "@vocab": "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#" });
        this.parser = new SKOSParser(this);

        this.FACETS = [];
        this.MEASURES = [];
        this.PRODUCT_TYPES = [];
    }

    public createAddress(): Localizable {
        return this.factory.createAddress({});
    }

    public async export(objects: Array<Semanticable>, options?: { exporter?: IConnectorExporter }): Promise<string> {
        const exporter = options?.exporter? options.exporter : this.exporter;
        return exporter.export(objects);
    }

    public async import(data: string, options?: { importer?: IConnectorImporter, factory?: IConnectorFactory, context?: any, callback?: Function, doNotStore?: boolean }): Promise<Array<Semanticable>> {
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
                        if (options && options.callback)
                            options.callback(semanticObject);
                    }
                });

                resolve(results);
            }
            catch(error) { reject(error) }
        });
    }

    private async loadThesaurus(data: any): Promise<any> {
        //return this.parser.parse(data[0]["@graph"]);
        const results: any = {};
        const context = data["@context"];
        const skosBroder: string = "http://www.w3.org/2004/02/skos/core#broader";
        const dfcM: string = "http://static.datafoodconsortium.org/data/measures.rdf#";

        const callback = (semanticObject: Semanticable) => {
            let broader: string = semanticObject.getSemanticProperty(skosBroder);
            if (broader) {
                broader = broader.split(dfcM)[1].toUpperCase();
                if (!results[broader])
                    results[broader] = {};
                const semanticId = semanticObject.getSemanticId().split(dfcM)[1];
                results[broader][semanticId] = semanticObject;
            }
        }

        await this.import(data, { context: context, callback: callback });
        
        //return this.parser.parse(data["@graph"]);
        return results;
    }

    public loadFacets(data: any): void {
        //this.FACETS = this.loadThesaurus(data);
    }

    public async loadMeasures(measures: any): Promise<void> {
        this.MEASURES = await this.loadThesaurus(measures);
    }

    public loadProductTypes(data: any): void {
        //this.PRODUCT_TYPES = this.loadThesaurus(data);
    }

    public async fetch(semanticObjectId: string, options?: IGetterOptions): Promise<Semanticable | undefined> {
        const store: IConnectorStore = options?.store? options.store : this.storeObject;

        if (!store.has(semanticObjectId)) {
            const fetchFunction = options?.fetch? options.fetch : this.fetchFunction;
            const importer = options?.importer? { importer: options.importer } : {};
            const document: string = await fetchFunction(semanticObjectId);
            const semanticObjects = await this.import(document, importer);
            store.setAll(semanticObjects);
            return semanticObjects.find(semanticObject => semanticObject.getSemanticId() === semanticObjectId);
        }

        return store.get(semanticObjectId);
    }

    public setDefaultFactory(factory: IConnectorFactory): void {
        this.factory = factory;
    }

    public setDefaultFetchFunction(fetch: (semanticId: string) => Promise<string>): void {
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