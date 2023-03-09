import { Semanticable } from "@virtual-assembly/semantizer";
import DatasetExt from "rdf-ext/lib/Dataset";
import IConnectorFactory from "./IConnectorFactory.js";

export default class ConnectorFactoryDefault implements IConnectorFactory {

    private error: Error = new Error("This factory must no be used. You must provide a valid implementation.");

    public createFromType(type: string): Semanticable {
        throw this.error;
    }

    public createFromRdfDataset(dataset: DatasetExt): Semanticable {
        throw this.error;
    }
    
}