import { Semanticable } from "@virtual-assembly/semantizer";
import IGetterOptions from "./IGetterOptions.js";

export default interface IConnector {

    store(semanticObject: Semanticable): void;
    fetch(semanticObjectId: string, options?: IGetterOptions): Promise<Semanticable | undefined>;

}