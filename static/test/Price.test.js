import Price from '../lib/Price.js';
import Connector from "../lib/Connector.js";
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
await connector.loadMeasures(JSON.stringify(measures));

const euro = connector.MEASURES.UNIT.CURRENCYUNIT.EURO;

const data = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"_:b2","@type":"Price","VATrate":"8","hasUnit":{"@id":"dfc-m:Euro"},"value":"2.54"}`;

test('Price:import', async () => {
    const price = new Price({
        connector: connector,
        value: 2.54,
        vatRate: 8.0,
        unit: euro
    });
    
    const imported = (await connector.import(data))[0];
    expect(imported.equals(price)).toStrictEqual(true);
});

test('Price:export', async () => {
    const price = new Price({
        connector: connector,
        value: 2.54,
        vatRate: 8.0,
        unit: euro
    });
    
    const serialized = await connector.export([price]);
    expect(serialized).toStrictEqual(data);
});