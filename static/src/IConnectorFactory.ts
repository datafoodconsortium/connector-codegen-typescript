import { Semanticable } from "@virtual-assembly/semantizer";
import DatasetExt from "rdf-ext/lib/Dataset";
import Localizable from "./Localizable";

export default interface IConnectorFactory {

    createFromRdfDataset(dataset: DatasetExt): Semanticable;
    createFromType(type: string): Semanticable;

    createAddress(parameters: any): Localizable;

}