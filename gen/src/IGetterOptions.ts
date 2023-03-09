import IConnectorFactory from "./IConnectorFactory";
import IConnectorImporter from "./IConnectorImporter";
import IConnectorStore from "./IConnectorStore";

export default interface IGetterOptions { 
    fetch?: (semanticId: string) => Promise<string>;
    importer?: IConnectorImporter; 
    factory?: IConnectorFactory;
    store?: IConnectorStore;
}