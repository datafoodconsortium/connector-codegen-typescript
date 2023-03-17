import Offer from '../lib/Offer.js';
import Price from '../lib/Price.js';
import CustomerCategory from '../lib/CustomerCategory.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import Connector from "../lib/Connector.js";
import ConnectorFactory from "../lib/ConnectorFactory.js";

const connector = new Connector();
connector.setDefaultFactory(new ConnectorFactory(connector));
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

connector.loadMeasures(measures);

const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@graph":[{"@id":"_:b1","@type":"Price","VATrate":"8","hasUnit":{"@id":"dfc-m:Euro"},"value":"2.54"},{"@id":"http://myplatform.com/offer1","@type":"Offer","offeredItem":{"@id":"http://myplatform.com/suppliedProduct1"},"offeredTo":{"@id":"http://myplatform.com/customerCategory1"},"price":{"@id":"_:b1"},"stockLimitation":"4.21"}]}`;

test('Offer:export', async () => {
    const customerCategory = new CustomerCategory({
        connector: connector,
        semanticId: "http://myplatform.com/customerCategory1"
    });

    const suppliedProduct = new SuppliedProduct({
        connector: connector,
        semanticId: "http://myplatform.com/suppliedProduct1"
    });

    const price = new Price({
        connector: connector,
        value: 2.54,
        vatRate: 8.0,
        unit: connector.MEASURES.UNIT.CURRENCYUNIT.EURO
    });

    const offer = new Offer({
        connector: connector,
        semanticId: "http://myplatform.com/offer1",
        offeredItem: suppliedProduct,
        offeredTo: customerCategory,
        price: price,
        stockLimitation: 4.21
    });

    const serialized = await connector.export([offer]);
    expect(serialized).toStrictEqual(expected);
});