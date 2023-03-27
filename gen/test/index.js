import CatalogItem from '../lib/CatalogItem.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import QuantitativeValue from '../lib/QuantitativeValue.js';
import AllergenCharacteristic from '../lib/AllergenCharacteristic.js';
import NutrientCharacteristic from '../lib/NutrientCharacteristic.js';
import PhysicalCharacteristic from '../lib/PhysicalCharacteristic.js';
import Connector from "../lib/Connector.js";
import ConnectorImporterJsonldStream from "../lib/ConnectorImporterJsonldStream.js";
import context from "../lib/context.js";

const connector = new Connector();

const adr1 = connector.createAddress({
    semanticId: "http://platform.com/adr1",
    city: "Paris"
})

const adr2 = connector.createAddress({
    semanticId: "http://platform.com/adr2",
    city: "London"
})

const adr3 = connector.createAddress({
    semanticId: "http://platform.com/adr3",
    city: "Bamako"
})

const person = connector.createPerson({
    semanticId: "http://platform.com/person1",
    firstName: "John",
    lastName: "Smith"
})

class Loader {
    async load(url) {
        return {
            "@context": context
        }
    }
}

//const exported = await connector.export([adr1, adr2, person, adr3]);
//console.log(exported);

const importer = new ConnectorImporterJsonldStream({ documentLoader: new Loader() });

const data = `{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@graph":[{"@id":"http://platform.com/adr1","@type":"dfc-b:Address","dfc-b:hasCity":"Paris"},{"@id":"http://platform.com/adr2","@type":"dfc-b:Address","dfc-b:hasCity":"London"},{"@id":"http://platform.com/adr3","@type":"dfc-b:Address","dfc-b:hasCity":"Bamako"},{"@id":"http://platform.com/person1","@type":"dfc-b:Person","dfc-b:familyName":"Smith","dfc-b:firstName":"John"}]}`;

const address = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Address";
const persons = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Person";

const imported = await connector.importOne(data, { importer: importer, only: address });
//const expected = imported[0];
console.log(imported);