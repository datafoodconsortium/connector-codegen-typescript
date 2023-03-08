
import { Semanticable } from "@virtual-assembly/semantizer"

export default interface IConnectorStore {
    fetch(semanticObjectId: string): Promise<Semanticable | undefined>;
    has(semanticObjectId: string): boolean;
    store(semanticObject: Semanticable): void;
}
