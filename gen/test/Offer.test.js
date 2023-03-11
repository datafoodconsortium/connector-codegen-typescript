import Offer from '../lib/Offer.js';

const connector = global.connector;
const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"http://myplatform.com/offer1","@type":"Offer"}`;

test('Offer:export', async () => {
    const offer = new Offer({
        semanticId: "http://myplatform.com/offer1"
    });

    const serialized = await connector.export([offer]);
    expect(serialized).toStrictEqual(expected);
});