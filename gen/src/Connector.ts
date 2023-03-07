
import { Semanticable, SemanticObject } from "@virtual-assembly/semantizer"
import jsonld from 'jsonld';
import ISKOSConcept from "./ISKOSConcept";
import SKOSParser from "./SKOSParser.js";

export default class Connector {

    public FACETS: Array<ISKOSConcept>;
    public MEASURES: Array<ISKOSConcept>;
    public PRODUCT_TYPES: Array<ISKOSConcept>;

    private static instance: Connector | undefined = undefined;

    private storeObject: Map<string, Semanticable>;

    private context: jsonld.ContextDefinition;
    //private exporter: JsonLdSerializer;
    private parser: SKOSParser;

    private constructor() {
        this.context = {
            "dfc-b": "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"
        };

        //this.exporter = new JsonLdSerializer(this.context);
        this.parser = new SKOSParser;

        this.storeObject = new Map<string, Semanticable>();

        this.FACETS = [];
        this.MEASURES = [];
        this.PRODUCT_TYPES = [];
    }

    public static getInstance(): Connector {
        if (this.instance === undefined)
            this.instance = new Connector;
        return this.instance;
    }

    public async export(subject: Semanticable, space: number | undefined): Promise<string> {
        //this.exporter.setSpace(space);
        return ""; // await this.exporter.process(subject);
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
        if (!this.storeObject.has(semanticObjectId)) {
            const document: string = ""; //(await fetch(semanticObjectId)).json;
            const semanticObject = new SemanticObject(document);
            this.storeObject.set(semanticObjectId, semanticObject);
            return semanticObject;
        }
        return this.storeObject.get(semanticObjectId);
    }

    public store(semanticObject: Semanticable): void {
        this.storeObject.set(semanticObject.getSemanticId(), semanticObject);
    }
}
