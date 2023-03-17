import Order from '../lib/Order.js';
import Person from '../lib/Person.js';
import SaleSession from '../lib/SaleSession.js';
import Connector from "../lib/Connector.js";
import ConnectorFactory from "../lib/ConnectorFactory.js";

const connector = new Connector();
connector.setDefaultFactory(new ConnectorFactory(connector));
const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"http://myplatform.com/order1","@type":"Order","belongsTo":{"@id":"http://myplatform.com/saleSession1"},"date":"date","orderNumber":"0001","orderedBy":{"@id":"http://myplatform.com/person1"}}`;

test('Order:export', async () => {
    const customer = new Person({
        connector: connector,
        semanticId: "http://myplatform.com/person1",
    });

    const saleSession = new SaleSession({
        connector: connector,
        semanticId: "http://myplatform.com/saleSession1",
        beginDate: "beginDate",
        endDate: "endDate"
    });

    const order = new Order({
        connector: connector,
        semanticId: "http://myplatform.com/order1",
        number: "0001",
        date: "date",
        saleSession: saleSession,
        client: customer
    });

    const serialized = await connector.export([order]);
    expect(serialized).toStrictEqual(expected);
});