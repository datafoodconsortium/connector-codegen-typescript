import { Semanticable } from "@virtual-assembly/semantizer";

export default interface IConnectorExporter {

    export(semanticObjets: Array<Semanticable>): Promise<string>;
    
}