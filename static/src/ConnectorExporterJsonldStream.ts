import { Semanticable } from "@virtual-assembly/semantizer";
import IConnectorExporter from "./IConnectorExporter";
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { Readable } from 'stream';
import { ContextDefinition } from "jsonld";

export default class ConnectorExporterJsonldStream implements IConnectorExporter {

    private context: ContextDefinition | undefined;

    public constructor(context?: ContextDefinition) {
        this.context = context;
    }

    public async export(semanticObjets: Array<Semanticable>): Promise<string> {
        const serializer = new SerializerJsonld({ compact: true, context: this.context });

        const input = new Readable({
            objectMode: true,
            read: () => {
                semanticObjets.forEach((semanticObject) => semanticObject.toRdfDataset().forEach((quad) => input.push(quad)));
                input.push(null)
            }
        });

        const output = serializer.import(input);

        return new Promise<string>((resolve, reject) => {
            output.on('data', (json) => resolve(JSON.stringify(json)));
            output.on('error', (error) => reject(error));
        });
    }

}