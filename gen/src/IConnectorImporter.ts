import { Semanticable } from "@virtual-assembly/semantizer";
import DatasetExt from "rdf-ext/lib/Dataset";

export default interface IConnectorImporter {

    import(data: string): Promise<Array<DatasetExt>>;
    
}