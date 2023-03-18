import Person from '../lib/Person.js';
import Address from '../lib/Address.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const data = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"http://myplatform.com/person1","@type":"Person","familyName":"Lecoq","firstName":"Maxime","hasAddress":{"@id":"http://myplatform.com/address/address1"}}`;

test('Person:import', async () => {
    const address = new Address({
        connector: connector,
        semanticId: "http://myplatform.com/address/address1"
    });

    const person = new Person({
        connector: connector,
        semanticId: "http://myplatform.com/person1",
        firstName: "Maxime",
        lastName: "Lecoq"
    });

    person.addLocalization(address);
    
    const imported = (await connector.import(data))[0];
    expect(imported.equals(person)).toStrictEqual(true);
});

test('Person:export', async () => {
    const address = new Address({
        connector: connector,
        semanticId: "http://myplatform.com/address/address1",
        city: "Briouze"
    });

    const person = new Person({
        connector: connector,
        semanticId: "http://myplatform.com/person1",
        firstName: "Maxime",
        lastName: "Lecoq"
    });

    person.addLocalization(address);
    
    const serialized = await connector.export([person]);
    expect(serialized).toStrictEqual(data);
});