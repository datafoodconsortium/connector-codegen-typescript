import Catalog from '../lib/Catalog.js';
import CatalogItem from '../lib/CatalogItem.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();
const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"http://myplatform.com/catalog1","@type":"Catalog","lists":{"@id":"http://myplatform.com/catalogItem1"}}`;

test('Catalog:export', async () => {
    const catalogItem = new CatalogItem({
        connector: connector,
        semanticId: "http://myplatform.com/catalogItem1"
    });

    const catalog = new Catalog({
        connector: connector,
        semanticId: "http://myplatform.com/catalog1",
        items: [catalogItem]
    });

    const serialized = await connector.export([catalog]);
    expect(serialized).toStrictEqual(expected);
});