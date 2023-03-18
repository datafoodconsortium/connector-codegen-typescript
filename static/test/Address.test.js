import Address from '../lib/Address.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();
const data = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"http://myplatform.com/address/address1","@type":"Address","hasCity":"Brussels","hasCountry":"Belgium","hasPostalCode":"00001","hasStreet":"1, place or Europe"}`;

test('Address:import', async () => {
    const expected = new Address({
        connector: connector,
        semanticId: "http://myplatform.com/address/address1",
        street: "1, place or Europe",
        postalCode: "00001",
        city: "Brussels",
        country: "Belgium",
    });
    
    const imported = (await connector.import(data))[0];
    expect(imported.equals(expected)).toStrictEqual(true);
});

test('Address:export', async () => {
    const address = new Address({
        connector: connector,
        semanticId: "http://myplatform.com/address/address1",
        street: "1, place or Europe",
        postalCode: "00001",
        city: "Brussels",
        country: "Belgium",
    });
    
    const serialized = await connector.export([address]);
    expect(serialized).toStrictEqual(data);
});