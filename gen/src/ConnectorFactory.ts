import { Semanticable } from "@virtual-assembly/semantizer";
import Address from "./Address.js";

export default class ConnectorFactory {

    public static createFromType(type: string): Semanticable {
        return new Address({semanticId: ""});
    }
    
}