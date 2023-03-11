import CatalogItem from '../lib/CatalogItem.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import Offer from '../lib/Offer.js';

const connector = global.connector;
const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"http://myplatform.com/catalogItem1","@type":"CatalogItem","offeredThrough":{"@id":"http://myplatform.com/offer1"},"references":{"@id":"http://myplatform.com/suppliedProduct1"}}`;

test('CatalogItem:export', async () => {
    const suppliedProduct = new SuppliedProduct({
        semanticId: "http://myplatform.com/suppliedProduct1"
    });

    const offer1 = new Offer({
        semanticId: "http://myplatform.com/offer1"
    });

    const catalogItem = new CatalogItem({
        semanticId: "http://myplatform.com/catalogItem1",
        offers: [offer1],
        product: suppliedProduct
    });

    const serialized = await connector.export([catalogItem]);
    expect(serialized).toStrictEqual(expected);
});