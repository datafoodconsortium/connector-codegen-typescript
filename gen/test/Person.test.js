import Person from '../lib/Person.js';
import Address from '../lib/Address.js';
import connector from '../lib/Connector.js';
import ConnectorFactory from '../lib/ConnectorFactory.js';

//const connector = global.connector;

//const expected = `{"@context":{"dfc-b":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"person/personId","@type":"dfc-b:Person","dfc-b:affiliates":"enterprise/enterprise1","dfc-b:familyName":"Doe","dfc-b:firstName":"John","dfc-b:hasAddress":"address/address1"}`;

test('serialize basic person', async () => {
    const fetch = (semanticObjectId) => {
        let semanticObject = undefined;
        if (semanticObjectId === "http://myplatform.com/address/address1") {
            semanticObject = new Address({
                semanticId: "http://myplatform.com/address/address1",
                city: "Briouze"
            });
        }
        return semanticObject;
    }

    connector.setConnectorFactory(new ConnectorFactory());

    /*
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


    const json = await connector.export(exporter, [person]);
    console.log(json)

    console.log(await person.getLocalizations());
    */
    
    const imported = await connector.import('{"@id":"http://myplatform.com/person1","@type":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Person","http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#familyName":"Lecoq","http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#firstName":"Maxime","http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAddress":{"@id":"http://myplatform.com/address/address1"}}');
    console.log(connector);

    console.log(await imported[0].getLocalizations({ fetch: fetch }));
    console.log(connector);
    /*
    await connector.import(json);
    console.log(await connector.fetch("http://myplatform.com/address/address1"));

    */
    //const addressGet = connector.fetch(address.getSemanticId());
    //console.log(await connector.fetch(address.getSemanticId()));
    
    //const serialized = await connector.export(person);
    //expect(serialized).toStrictEqual(expected);
});