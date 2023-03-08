
import { Semanticable, SemanticObject } from "@virtual-assembly/semantizer"
import jsonld from 'jsonld';
import DatasetExt from "rdf-ext/lib/Dataset";
import ConnectorExporterJsonldStream from "./ConnectorExporterJsonldStream.js";
import ConnectorFactory from "./ConnectorFactory.js";
import ConnectorImporterJsonldStream from "./ConnectorImporterJsonldStream.js";
import ConnectorStoreMap from "./ConnectorStoreMap.js";
import IConnectorExporter from "./IConnectorExporter";
import IConnectorImporter from "./IConnectorImporter";
import IConnectorStore from "./IConnectorStore";
import ISKOSConcept from "./ISKOSConcept";
import SKOSParser from "./SKOSParser.js";

export default class Connector {

    public FACETS: Array<ISKOSConcept>;
    public MEASURES: Array<ISKOSConcept>;
    public PRODUCT_TYPES: Array<ISKOSConcept>;

    private static instance: Connector | undefined = undefined;

    private importer: IConnectorImporter | undefined = undefined;
    private exporter: IConnectorExporter | undefined = undefined;
    private storeObject: IConnectorStore | undefined = undefined;

    private context: jsonld.ContextDefinition;
    private parser: SKOSParser;

    private constructor() {
        this.context = {
            "dfc-b": "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"
        };

        this.storeObject = new ConnectorStoreMap();
        this.importer = new ConnectorImporterJsonldStream();
        this.exporter = new ConnectorExporterJsonldStream();
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

    public async export(objects: Array<Semanticable>): Promise<string> {
        if (!this.exporter)
            throw new Error("Exporter not found");

        return this.exporter.export(objects);
    }

    public async import(data: string): Promise<Array<Semanticable>> {
        if (!this.importer)
            throw new Error("Importer not found");

        const results: Array<Semanticable> = new Array<Semanticable>();
        const datasets: Array<DatasetExt> = await this.importer.import(data);

        datasets.forEach(dataset => {
            const rdfType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
            const type = Array.from(dataset.filter((quad) => quad.predicate.value === rdfType))[0].object.value;
            const semanticObject = ConnectorFactory.createFromType(type);
            semanticObject.setSemanticPropertyAllFromRdfDataset(dataset);
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

    public async fetch(semanticObjectId: string): Promise<Semanticable | undefined> {
        if (!this.storeObject)
            throw new Error("Store not found");

        return this.storeObject.fetch(semanticObjectId);
    }

    public setExporter(exporter: IConnectorExporter): void {
        this.exporter = exporter;
    }

    public setImporter(importer: IConnectorImporter): void {
        this.importer = importer;
    }

    public setStore(store: IConnectorStore): void {
        this.storeObject = store;
    }

    public store(semanticObject: Semanticable): void {
        if (!this.storeObject)
            throw new Error("Store not found");
        
        this.storeObject.store(semanticObject);
    }
}
