import IConnectorFactory from "./IConnectorFactory";
import IConnectorImporter from "./IConnectorImporter";
import IConnectorImporterOptions from "./IConnectorImporterOptions";

export default interface IConnectorImportOptions extends IConnectorImporterOptions {
    
    importer?: IConnectorImporter;
    factory?: IConnectorFactory;
    doNotStore?: boolean;

}