import { Semanticable } from "@virtual-assembly/semantizer";
import DatasetExt from "rdf-ext/lib/Dataset";
import { DatasetCore } from '@rdfjs/types';
import Localizable from "./Localizable";

export default interface IConnectorFactory {

    createFromRdfDataset(dataset: DatasetExt): Semanticable | undefined;
    createFromRdfDatasetCore(dataset: DatasetCore): Semanticable | undefined;
    createFromType(type: string): Semanticable | undefined;
    createAddress(parameters: any): Localizable;

}