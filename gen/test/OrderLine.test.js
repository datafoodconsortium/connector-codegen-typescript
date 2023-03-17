import Offer from '../lib/Offer.js';
import Order from '../lib/Order.js';
import Price from '../lib/Price.js';
import OrderLine from '../lib/OrderLine.js';
import Connector from "../lib/Connector.js";
import ConnectorFactory from "../lib/ConnectorFactory.js";

const connector = new Connector();
connector.setDefaultFactory(new ConnectorFactory(connector));
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

connector.loadMeasures(measures);

const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@graph":[{"@id":"_:b1","@type":"Price","VATrate":"19.9","hasUnit":{"@id":"dfc-m:Euro"},"value":"5.42"},{"@id":"http://myplatform.com/orderLine1","@type":"OrderLine","concerns":{"@id":"http://myplatform.com/offer1"},"hasPrice":{"@id":"_:b1"},"partOf":{"@id":"http://myplatform.com/order1"},"quantity":"2"}]}`;

test('OrderLine:export', async () => {
    const offer = new Offer({
        connector: connector,
        semanticId: "http://myplatform.com/offer1"
    });

    const order = new Order({
        connector: connector,
        semanticId: "http://myplatform.com/order1"
    });

    const price = new Price({
        connector: connector,
        value: 5.42,
        vatRate: 19.9,
        unit: connector.MEASURES.UNIT.CURRENCYUNIT.EURO
    });

    const orderLine = new OrderLine({
        connector: connector,
        semanticId: "http://myplatform.com/orderLine1",
        order: order,
        offer: offer,
        price: price,
        quantity: 2
    });

    const serialized = await connector.export([orderLine]);
    expect(serialized).toStrictEqual(expected);
});