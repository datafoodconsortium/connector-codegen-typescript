
import { Semanticable, SemanticObject } from "@virtual-assembly/semantizer"
import IConnectorStore from "./IConnectorStore";

export default class ConnectorStoreMap implements IConnectorStore {

    private storeObject: Map<string, Semanticable>;

    public constructor() {
        this.storeObject = new Map<string, Semanticable>();
    }

    public async fetch(semanticObjectId: string): Promise<Semanticable | undefined> {
        if (!this.storeObject.has(semanticObjectId)) {
            const document: string = ""; //(await fetch(semanticObjectId)).json;
            const semanticObject = new SemanticObject(document);
            this.storeObject.set(semanticObjectId, semanticObject);
            return semanticObject;
        }
        return this.storeObject.get(semanticObjectId);
    }

    public has(semanticObjectId: string): boolean {
        return this.storeObject.has(semanticObjectId);
    }

    public store(semanticObject: Semanticable): void {
        this.storeObject.set(semanticObject.getSemanticId(), semanticObject);
    }
}
