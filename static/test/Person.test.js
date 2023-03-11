import Person from '../lib/Person.js';
import Address from '../lib/Address.js';

const connector = global.connector;
const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"http://myplatform.com/person1","@type":"Person","familyName":"Lecoq","firstName":"Maxime","hasAddress":{"@id":"http://myplatform.com/address/address1"}}`;

test('Person:export', async () => {
    const address = new Address({
        semanticId: "http://myplatform.com/address/address1",
        city: "Briouze"
    });

    const person = new Person({ 
        semanticId: "http://myplatform.com/person1",
        firstName: "Maxime",
        lastName: "Lecoq"
    });

    person.addLocalization(address);
    
    const serialized = await connector.export([person]);
    expect(serialized).toStrictEqual(expected);
});