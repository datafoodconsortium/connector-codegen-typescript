import { Semanticable } from "@virtual-assembly/semantizer";
import DatasetExt from "rdf-ext/lib/Dataset";

export default interface IConnectorFactory {

    createFromRdfDataset(dataset: DatasetExt): Semanticable;
    createFromType(type: string): Semanticable;

}