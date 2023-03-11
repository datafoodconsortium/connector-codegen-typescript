import CatalogItem from '../lib/CatalogItem.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import QuantitativeValue from '../lib/QuantitativeValue.js';
import AllergenCharacteristic from '../lib/AllergenCharacteristic.js';
import NutrientCharacteristic from '../lib/NutrientCharacteristic.js';
import PhysicalCharacteristic from '../lib/PhysicalCharacteristic.js';

const connector = global.connector;
const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@graph":[{"@id":"_:b1","@type":"QuantitativeValue","hasUnit":{"@id":"dfc-m:Kilogram"}},{"@id":"_:b2","@type":"QuantitativeValue","hasAllergenDimension":{"@id":"dfc-m:Peanuts"},"hasUnit":{"@id":"dfc-m:Kilogram"},"value":"1"},{"@id":"_:b3","@type":"QuantitativeValue","hasNutrientDimension":{"@id":"dfc-m:Calcium"},"hasUnit":{"@id":"dfc-m:Gram"},"value":"10"},{"@id":"_:b4","@type":"QuantitativeValue","hasPhysicalDimension":{"@id":"dfc-m:Weight"},"hasUnit":{"@id":"dfc-m:Gram"},"value":"100"},{"@id":"https://myplatform.com/tomato","@type":"SuppliedProduct","description":"Awesome tomato","hasAllergenCharacteristic":{"@id":"_:b2"},"hasCertification":[{"@id":"dfc-f:Organic-AB"},{"@id":"dfc-f:Organic-EU"}],"hasClaim":{"@id":"dfc-f:NoAddedSugars"},"hasGeographicalOrigin":{"@id":"dfc-f:CentreValLoire"},"hasNatureOrigin":{"@id":"dfc-f:PlantOrigin"},"hasNutrientCharacteristic":{"@id":"_:b3"},"hasPartOrigin":{"@id":"dfc-f:Fruit"},"hasPhysicalCharacteristic":{"@id":"_:b4"},"hasQuantity":{"@id":"_:b1"},"hasType":{"@id":"http://static.datafoodconsortium.org/data/productTypes.rdf#round-tomato"},"lifetime":"a week","name":"Tomato","referencedBy":{"@id":"https://myplatform.com/catalogItem"},"usageOrStorageCondition":"free text"}]}`;

test('SuppliedProduct:export', async () => {
    const gram = connector.MEASURES.UNIT.QUANTITYUNIT.GRAM;
    const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;

    let suppliedProduct = new SuppliedProduct({
        semanticId: "https://myplatform.com/tomato",
        name: "Tomato", 
        description: "Awesome tomato",
        productType: connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO, 
        quantity: new QuantitativeValue({ quantity: 1, unit: kilogram }),
        alcoholPercentage: 0.0, 
        lifetime: "a week", 
        claims: [connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS], 
        usageOrStorageConditions: "free text", 
        allergenCharacteristics: [new AllergenCharacteristic({ value: 1, unit: kilogram, allergenDimension: connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS })],
        nutrientCharacteristics: [new NutrientCharacteristic({ value: 10, unit: gram, nutrientDimension: connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM })],
        physicalCharacteristics: [new PhysicalCharacteristic({ value: 100, unit: gram, physicalDimension: connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT })],
        geographicalOrigin: connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.CENTREVALLOIRE,
        catalogItems: [new CatalogItem({ semanticId: "https://myplatform.com/catalogItem" })], 
        certifications: [connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB, connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU],
        natureOrigin: [connector.FACETS.NATUREORIGIN.PLANTORIGIN],
        partOrigin: [connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT]
    });

    const serialized = await connector.export([suppliedProduct]);
    expect(serialized).toStrictEqual(expected);
});