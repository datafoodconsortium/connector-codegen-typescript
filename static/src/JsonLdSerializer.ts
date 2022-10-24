import { ObjectSerializer, Semanticable, Serializer } from "@virtual-assembly/semantizer";
import jsonld from 'jsonld';

export default class JsonLdSerializer implements Serializer<Promise<string>> {

    private context: jsonld.ContextDefinition;

    constructor(context: jsonld.ContextDefinition) {
        this.context = context;
    }

    async process(subject: Semanticable): Promise<string> {
        let document = subject.serialize(new ObjectSerializer);
        const compacted = await jsonld.compact(document, this.context);
        return JSON.stringify(compacted, null, 2);
    }

}