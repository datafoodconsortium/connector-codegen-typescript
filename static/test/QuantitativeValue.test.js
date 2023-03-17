import QuantitativeValue from '../lib/QuantitativeValue.js';
import Connector from "../lib/Connector.js";
import ConnectorFactory from "../lib/ConnectorFactory.js";
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
connector.loadMeasures(measures);
connector.setDefaultFactory(new ConnectorFactory(connector));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;

const data = ``;

test('QuantitativeValue:import', async () => {
    const quantitativeValue = new QuantitativeValue({ 
        connector: connector, 
        quantity: 1, 
        unit: kilogram 
    });
    
    const imported = (await connector.import(data))[0];
    expect(imported.equals(quantitativeValue)).toStrictEqual(true);
});

test('QuantitativeValue:export', async () => {
    const quantitativeValue = new QuantitativeValue({ 
        connector: connector, 
        quantity: 1, 
        unit: kilogram 
    });
    
    const serialized = await connector.export([quantitativeValue]);
    console.log(serialized);
    expect(serialized).toStrictEqual(data);
});