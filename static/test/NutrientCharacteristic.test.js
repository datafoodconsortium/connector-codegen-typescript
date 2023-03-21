import NutrientCharacteristic from '../lib/NutrientCharacteristic.js';
import Connector from "../lib/Connector.js";
import facets from '../test/thesaurus/facets.json' assert { type: 'json' };
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
await connector.loadFacets(JSON.stringify(facets));
await connector.loadMeasures(JSON.stringify(measures));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
const nutrientDimension = connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM;

const nutrientCharacteristic = new NutrientCharacteristic({ 
    connector: connector, 
    value: 10, 
    unit: kilogram, 
    nutrientDimension: nutrientDimension
});

const json = ``;

test('NutrientCharacteristic:import', async () => {
    const imported = await connector.import(json);
    const importedNutrientCharacteristic = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedNutrientCharacteristic.equals(nutrientCharacteristic)).toStrictEqual(true);
});

test('NutrientCharacteristic:export', async () => {
    const serialized = await connector.export([nutrientCharacteristic]);
    console.log(serialized);
    expect(serialized).toStrictEqual(json);
});

test('NutrientCharacteristic:getSemanticId', async () => {
    expect(nutrientCharacteristic.getSemanticId()).toStrictEqual(undefined);
});

test('NutrientCharacteristic:getQuantityValue', async () => {
    expect(nutrientCharacteristic.getQuantityValue()).toStrictEqual(10);
});

test('NutrientCharacteristic:getQuantityUnit', async () => {
    expect(await nutrientCharacteristic.getQuantityUnit()).toStrictEqual(kilogram);
});

test('NutrientCharacteristic:getQuantityDimension', async () => {
    expect(await nutrientCharacteristic.getQuantityDimension()).toStrictEqual(nutrientDimension);
});