import { Semanticable } from "@virtual-assembly/semantizer";
import IConnectorExporter from "./IConnectorExporter";
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { Readable } from 'stream';

export default class ConnectorExporterJsonldStream implements IConnectorExporter {

    public async export(semanticObjets: Array<Semanticable>): Promise<string> {
        const context = {
            '@vocab': 'http://schema.org/',
            'dfc-b': 'http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#'
        }
        
        const serializer = new SerializerJsonld({ compact: true });
        
        const input = new Readable({
            objectMode: true,
            read: () => {
                semanticObjets.forEach((semanticObject) => semanticObject.toRdfDataset().forEach((quad) => input.push(quad)));
                input.push(null)
            }
        });

        return new Promise<string>((resolve, reject) => serializer.import(input).once('data', (data) => resolve(JSON.stringify(data))));
    }

}