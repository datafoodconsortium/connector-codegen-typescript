import NutrientCharacteristic from '../lib/NutrientCharacteristic.js';
import Connector from "../lib/Connector.js";
import ConnectorFactory from "../lib/ConnectorFactory.js";
import facets from '../test/thesaurus/facets.json' assert { type: 'json' };
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
connector.loadFacets(facets);
connector.loadMeasures(measures);
connector.setDefaultFactory(new ConnectorFactory(connector));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
const nutrientDimension = connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM;

const data = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"_:b2","@type":"NutrientCharacteristic","hasNutrientDimension":{"@id":"dfc-m:Calcium"},"hasUnit":{"@id":"dfc-m:Kilogram"},"value":"10"}`;

test('NutrientCharacteristic:import', async () => {
    const nutrientCharacteristic = new NutrientCharacteristic({ 
        connector: connector, 
        value: 10, 
        unit: kilogram, 
        nutrientDimension: nutrientDimension
    });
    
    const imported = (await connector.import(data))[0];
    expect(imported.equals(nutrientCharacteristic)).toStrictEqual(true);
});

test('NutrientCharacteristic:export', async () => {
    const nutrientCharacteristic = new NutrientCharacteristic({ 
        connector: connector, 
        value: 10, 
        unit: kilogram, 
        nutrientDimension: nutrientDimension
    });
    
    const serialized = await connector.export([nutrientCharacteristic]);
    expect(serialized).toStrictEqual(data);
});