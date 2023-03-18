import { JsonLdParser } from "jsonld-streaming-parser";
import IConnectorImporter from "./IConnectorImporter";
import { Readable } from 'stream';
import DatasetExt from "rdf-ext/lib/Dataset";
import datasetFactory from 'rdf-ext';
import QuadExt from "rdf-ext/lib/Quad";
import IConnectorImporterOptions from "./IConnectorImporterOptions";

export default class ConnectorImporterJsonldStream implements IConnectorImporter {

    private context: string | undefined;

    public constructor(context?: any) {
        this.context = context;
    }

    public async import(json: string, options?: IConnectorImporterOptions): Promise<Array<DatasetExt>> {
        const context = options?.context? options.context : this.context;
        const parser = new JsonLdParser({ context: context });
        let datasets: Array<DatasetExt> = new Array<DatasetExt>();

        const input = new Readable();
        input.push(json);
        input.push(null);

        const output = parser.import(input);
        
        output.on('data', (quad) => {
            const subject: string = quad.subject.value;
            const dataset: DatasetExt | undefined = datasets.find((dataset) => dataset.some((quad: QuadExt) => quad.subject.value === subject));

            if (dataset) dataset.add(quad);

            else {
                const dataset = datasetFactory.dataset();
                dataset.add(quad);
                datasets.push(dataset);
            }

            if (options && options.callbacks)
                options.callbacks.forEach(callback => callback(quad));
        });

        return new Promise((resolve, reject) => {
            output.on('error', (error) => reject(error));
            output.on('finish', () => resolve(datasets));
        });
    }

}