import Person from '../lib/Person.js';
import Address from '../lib/Address.js';

const connector = global.connector;
const expected = `{"@id":"http://myplatform.com/person1","@type":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Person","http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#familyName":"Lecoq","http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#firstName":"Maxime","http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAddress":{"@id":"http://myplatform.com/address/address1"}}`;

test('serialize basic person', async () => {
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