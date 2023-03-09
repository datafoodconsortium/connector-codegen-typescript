
import { Semanticable } from "@virtual-assembly/semantizer"
import IConnectorStore from "./IConnectorStore";

export default class ConnectorStoreMap implements IConnectorStore {

    private storeObject: Map<string, Semanticable>;

    public constructor() {
        this.storeObject = new Map<string, Semanticable>();
    }

    public async fetch(semanticObjectId: string): Promise<Semanticable | undefined> {
        return this.storeObject.get(semanticObjectId);
    }

    public has(semanticObjectId: string): boolean {
        return this.storeObject.has(semanticObjectId);
    }

    public store(semanticObject: Semanticable): void {
        this.storeObject.set(semanticObject.getSemanticId(), semanticObject);
    }

    public storeAll(semanticObjects: Array<Semanticable>): void {
        semanticObjects.forEach(semanticObject => this.store(semanticObject));
    }
    
}
