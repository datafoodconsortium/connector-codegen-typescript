import Enterprise from '../lib/Enterprise.js';
import Address from '../lib/Address.js';
import CustomerCategory from '../lib/CustomerCategory.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import CatalogItem from '../lib/CatalogItem.js';

const connector = global.connector;
const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"http://myplatform.com/enterprise1","@type":"Enterprise","VATnumber":"vatNumber","defines":{"@id":"http://myplatform.com/customerCategory1"},"hasAddress":{"@id":"http://myplatform.com/address1"},"hasDescription":"description"}`;

test('Enterprise:export', async () => {
    const address = new Address({
        semanticId: "http://myplatform.com/address1",
        city: "Briouze"
    });

    const customerCategory = new CustomerCategory({
        semanticId: "http://myplatform.com/customerCategory1"
    });

    const suppliedProduct = new SuppliedProduct({
        semanticId: "http://myplatform.com/suppliedProduct1"
    });

    const catalogItem = new CatalogItem({
        semanticId: "http://myplatform.com/catalogItem1"
    });

    const enterprise = new Enterprise({
        semanticId: "http://myplatform.com/enterprise1",
        description: "description",
        localizations: [address],
        vatNumber: "vatNumber",
        customerCategories: [customerCategory],
        suppliedProducts: [suppliedProduct],
        catalogItems: [catalogItem]
    })

    const serialized = await connector.export([enterprise]);
    expect(serialized).toStrictEqual(expected);
});