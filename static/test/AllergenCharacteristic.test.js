import AllergenCharacteristic from '../lib/AllergenCharacteristic.js';
import Connector from "../lib/Connector.js";
import ConnectorFactory from "../lib/ConnectorFactory.js";
import facets from '../test/thesaurus/facets.json' assert { type: 'json' };
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
connector.loadFacets(facets);
connector.loadMeasures(measures);
connector.setDefaultFactory(new ConnectorFactory(connector));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
const allergenDimension = connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS;

const data = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"_:b2","@type":"AllergenCharacteristic","hasAllergenDimension":{"@id":"dfc-m:Peanuts"},"hasUnit":{"@id":"dfc-m:Kilogram"},"value":"1"}`;

test('AllergenCharacteristic:import', async () => {
    const allergenCharacteristic = new AllergenCharacteristic({
        connector: connector, 
        value: 1, 
        unit: kilogram, 
        allergenDimension: allergenDimension
    });
    
    const imported = (await connector.import(data))[0];
    expect(imported.equals(allergenCharacteristic)).toStrictEqual(true);
});

test('AllergenCharacteristic:export', async () => {
    const allergenCharacteristic = new AllergenCharacteristic({
        connector: connector, 
        value: 1, 
        unit: kilogram, 
        allergenDimension: allergenDimension
    });
    
    const serialized = await connector.export([allergenCharacteristic]);
    expect(serialized).toStrictEqual(data);
});