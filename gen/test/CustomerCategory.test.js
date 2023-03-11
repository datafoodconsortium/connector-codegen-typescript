import CustomerCategory from '../lib/CustomerCategory.js';

const connector = global.connector;
const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"http://myplatform.com/customerCategory1","@type":"CustomerCategory","description":"description"}`;

test('CustomerCategory:export', async () => {
    const customerCategory = new CustomerCategory({
        semanticId: "http://myplatform.com/customerCategory1",
        description: "description"
    })

    const serialized = await connector.export([customerCategory]);
    expect(serialized).toStrictEqual(expected);
});