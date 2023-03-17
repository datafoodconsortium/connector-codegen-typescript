import Offer from '../lib/Offer.js';
import SaleSession from '../lib/SaleSession.js';
import Connector from "../lib/Connector.js";
import ConnectorFactory from "../lib/ConnectorFactory.js";

const connector = new Connector();
connector.setDefaultFactory(new ConnectorFactory(connector));
const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"http://myplatform.com/saleSession1","@type":"SaleSession","beginDate":"beginDate","endDate":"endDate","quantity":"5"}`;

test('SaleSession:export', async () => {
    const offer = new Offer({
        connector: connector,
        semanticId: "http://myplatform.com/offer1"
    });

    const saleSession = new SaleSession({
        connector: connector,
        semanticId: "http://myplatform.com/saleSession1",
        beginDate: "beginDate",
        endDate: "endDate",
        quantity: 5,
        offers: [offer]
    });

    const serialized = await connector.export([saleSession]);
    expect(serialized).toStrictEqual(expected);
});