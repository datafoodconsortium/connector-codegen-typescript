import PhysicalCharacteristic from '../lib/PhysicalCharacteristic.js';
import Connector from "../lib/Connector.js";
import facets from '../test/thesaurus/facets.json' assert { type: 'json' };
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
await connector.loadFacets(JSON.stringify(facets));
await connector.loadMeasures(JSON.stringify(measures));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
const physicalDimension = connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT;

const physicalCharacteristic = new PhysicalCharacteristic({ 
    connector: connector, 
    value: 100, 
    unit: kilogram, 
    physicalDimension: physicalDimension
});

const json = ``;

test('PhysicalCharacteristic:import', async () => {
    const imported = await connector.import(json);
    const importedPhysicalCharacteristic = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedPhysicalCharacteristic.equals(physicalCharacteristic)).toStrictEqual(true);
});

test('PhysicalCharacteristic:export', async () => {
    const serialized = await connector.export([physicalCharacteristic]);
    console.log(serialized);
    expect(serialized).toStrictEqual(json);
});

test('PhysicalCharacteristic:getSemanticId', async () => {
    expect(physicalCharacteristic.getSemanticId()).toStrictEqual(undefined);
});

test('PhysicalCharacteristic:getQuantityValue', async () => {
    expect(physicalCharacteristic.getQuantityValue()).toStrictEqual(100);
});

test('PhysicalCharacteristic:getQuantityUnit', async () => {
    expect(await physicalCharacteristic.getQuantityUnit()).toStrictEqual(kilogram);
});

test('PhysicalCharacteristic:getQuantityDimension', async () => {
    expect(await physicalCharacteristic.getQuantityDimension()).toStrictEqual(physicalDimension);
});