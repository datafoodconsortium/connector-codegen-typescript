import { JsonLdParser } from "jsonld-streaming-parser";
import IConnectorImporter from "./IConnectorImporter";
import { Readable } from 'stream';
import DatasetExt from "rdf-ext/lib/Dataset";
import datasetFactory from 'rdf-ext';
import QuadExt from "rdf-ext/lib/Quad";

export default class ConnectorImporterJsonldStream implements IConnectorImporter {

    public async import(json: string): Promise<Array<DatasetExt>> {
        const parser = new JsonLdParser();
        let datasets: Array<DatasetExt> = new Array<DatasetExt>();

        const input = new Readable();
        input.push(json);
        input.push(null);

        parser.import(input).on('data', (quad) => {
            const subject: string = quad.subject.value;
            const dataset: DatasetExt | undefined = datasets.find((dataset) => dataset.some((quad: QuadExt) => quad.subject.value === subject));

            if (dataset) dataset.add(quad);

            else {
                const dataset = datasetFactory.dataset();
                dataset.add(quad);
                datasets.push(dataset);
            }
        });

        return new Promise((resolve, reject) => parser.import(input).on('finish', () => resolve(datasets)));
    }

}