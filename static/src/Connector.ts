
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

export class Connector {

    public FACETS: Array<ISKOSConcept>;
    public MEASURES: Array<ISKOSConcept>;
    public PRODUCT_TYPES: Array<ISKOSConcept>;

    private static instance: Connector | undefined = undefined;

    private fetchFunction: Function;
    private factory: IConnectorFactory;
    private importer: IConnectorImporter;
    private exporter: IConnectorExporter;
    private storeObject: IConnectorStore;

    private parser: SKOSParser;

    private constructor() {
        const context: string = "http://static.datafoodconsortium.org/ontologies/context.json";

        this.storeObject = new ConnectorStoreMap();
        this.fetchFunction = async (semanticId: string) => (await fetch(semanticId)).json;
        this.factory = new ConnectorFactoryDefault();
        this.importer = new ConnectorImporterJsonldStream(context);
        this.exporter = new ConnectorExporterJsonldStream({ "@vocab": "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#" });
        this.parser = new SKOSParser;

        this.FACETS = [];
        this.MEASURES = [];
        this.PRODUCT_TYPES = [];
    }

    public static getInstance(): Connector {
        if (this.instance === undefined)
            this.instance = new Connector;
        return this.instance;
    }

    public async export(objects: Array<Semanticable>, options?: { exporter?: IConnectorExporter }): Promise<string> {
        const exporter = options?.exporter? options.exporter : this.exporter;
        return exporter.export(objects);
    }

    public async import(data: string, options?: { importer?: IConnectorImporter, factory?: IConnectorFactory }): Promise<Array<Semanticable>> {
        const importer = options?.importer? options.importer : this.importer;
        const factory = options?.factory? options.factory : this.factory;
        const results: Array<Semanticable> = new Array<Semanticable>();
        const datasets: Array<DatasetExt> = await importer.import(data);

        datasets.forEach(dataset => {
            const semanticObject = factory.createFromRdfDataset(dataset);
            results.push(semanticObject);
            this.store(semanticObject);
        });

        return new Promise((resolve, reject) => resolve(results));
    }

    private loadThesaurus(data: any): any {
        return this.parser.parse(data[0]["@graph"]);
    }

    public loadFacets(data: any): void {
        this.FACETS = this.loadThesaurus(data);
    }

    public loadMeasures(data: any): void {
        this.MEASURES = this.loadThesaurus(data);
    }

    public loadProductTypes(data: any): void {
        this.PRODUCT_TYPES = this.loadThesaurus(data);
    }

    public async fetch(semanticObjectId: string, options?: IGetterOptions): Promise<Semanticable | undefined> {
        const store: IConnectorStore = options?.store? options.store : this.storeObject;

        if (!store.has(semanticObjectId)) {
            const fetchFunction = options?.fetch? options.fetch : this.fetchFunction;
            const importer = options?.importer? { importer: options.importer } : {};
            const document: string = await fetchFunction(semanticObjectId);
            const semanticObjects = await this.import(document, importer);
            store.storeAll(semanticObjects);
            return semanticObjects.find(semanticObject => semanticObject.getSemanticId() === semanticObjectId);
        }

        return store.fetch(semanticObjectId);
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
        this.storeObject.store(semanticObject);
    }
}

const connector: Connector = Connector.getInstance();
export default connector;