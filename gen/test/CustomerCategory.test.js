import CustomerCategory from '../lib/CustomerCategory.js';
import Connector from "../lib/Connector.js";
import ConnectorFactory from "../lib/ConnectorFactory.js";

const connector = new Connector();
connector.setDefaultFactory(new ConnectorFactory(connector));
const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"http://myplatform.com/customerCategory1","@type":"CustomerCategory","description":"description"}`;

test('CustomerCategory:export', async () => {
    const customerCategory = new CustomerCategory({
        connector: connector,
        semanticId: "http://myplatform.com/customerCategory1",
        description: "description"
    })

    const serialized = await connector.export([customerCategory]);
    expect(serialized).toStrictEqual(expected);
});