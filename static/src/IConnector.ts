import { Semanticable } from "@virtual-assembly/semantizer";
import IConnectorFactory from "./IConnectorFactory.js";
import IGetterOptions from "./IGetterOptions.js";

export default interface IConnector {

    // TODO: remove
    getDefaultFactory(): IConnectorFactory;

    // TODO: add createAddress, createPrice, etc.
    
    store(semanticObject: Semanticable): void;
    fetch(semanticObjectId: string, options?: IGetterOptions): Promise<Semanticable | undefined>;

}