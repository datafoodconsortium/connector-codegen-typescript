import Person from '../lib/Person.js';
import Address from '../lib/Address.js';
import Enterprise from '../lib/Enterprise.js';
import jestConfig from '../jest.config.js';

//const connector = global.connector;

//const expected = `{"@context":{"dfc-b":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"person/personId","@type":"dfc-b:Person","dfc-b:affiliates":"enterprise/enterprise1","dfc-b:familyName":"Doe","dfc-b:firstName":"John","dfc-b:hasAddress":"address/address1"}`;

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

    const connector = address.getConnector();
    const json = await connector.export([person]);
    console.log(await person.getLocalizations());
    /*
    await connector.import(json);
    console.log(await connector.fetch("http://myplatform.com/address/address1"));

    */
    //const addressGet = connector.fetch(address.getSemanticId());
    //console.log(await connector.fetch(address.getSemanticId()));
    
    //const serialized = await connector.export(person);
    //expect(serialized).toStrictEqual(expected);
});