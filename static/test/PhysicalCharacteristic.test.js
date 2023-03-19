import PhysicalCharacteristic from '../lib/PhysicalCharacteristic.js';
import Connector from "../lib/Connector.js";
import facets from '../test/thesaurus/facets.json' assert { type: 'json' };
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
await connector.loadFacets(JSON.stringify(facets));
await connector.loadMeasures(JSON.stringify(measures));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
const physicalDimension = connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT;

const data = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"_:b2","@type":"PhysicalCharacteristic","hasPhysicalDimension":{"@id":"dfc-m:Weight"},"hasUnit":{"@id":"dfc-m:Kilogram"},"value":"100"}`;

test('PhysicalCharacteristic:import', async () => {
    const physicalCharacteristic = new PhysicalCharacteristic({ 
        connector: connector, 
        value: 100, 
        unit: kilogram, 
        physicalDimension: physicalDimension
    });
    
    const imported = (await connector.import(data))[0];
    expect(imported.equals(physicalCharacteristic)).toStrictEqual(true);
});

test('PhysicalCharacteristic:export', async () => {
    const physicalCharacteristic = new PhysicalCharacteristic({ 
        connector: connector, 
        value: 100, 
        unit: kilogram, 
        physicalDimension: physicalDimension
    });
    
    const serialized = await connector.export([physicalCharacteristic]);
    expect(serialized).toStrictEqual(data);
});