import CatalogItem from '../lib/CatalogItem.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import QuantitativeValue from '../lib/QuantitativeValue.js';
import AllergenCharacteristic from '../lib/AllergenCharacteristic.js';
import NutrientCharacteristic from '../lib/NutrientCharacteristic.js';
import PhysicalCharacteristic from '../lib/PhysicalCharacteristic.js';

const connector = global.connector;
const expected = ``;

test('serialize basic enterprise', async () => {
    const gram = connector.MEASURES.UNIT.QUANTITYUNIT.GRAM;
    const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;

    let suppliedProduct = new SuppliedProduct({
        semanticId: "https://myplatform.com/tomato",
        name: "Tomato", 
        description: "Awesome tomato",
        productType: connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO, 
        quantity: new QuantitativeValue(kilogram, 1), 
        alcoholPercentage: 0.0, 
        lifetime: "a week", 
        claims: [connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS], 
        usageOrStorageConditions: "free text", 
        allergenCharacteristics: [new AllergenCharacteristic(kilogram, 1, connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS)],
        nutrientCharacteristics: [new NutrientCharacteristic(gram, 10, connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM)],
        physicalCharacteristics: [new PhysicalCharacteristic(gram, 100, connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT)],
        geographicalOrigin: connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.CENTREVALLOIRE,
        catalogItems: [new CatalogItem({ semanticId: "https://myplatform.com/catalogItem" })], 
        certifications: [connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB],
        natureOrigin: [connector.FACETS.NATUREORIGIN.PLANTORIGIN],
        partOrigin: [connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT]
    });

    //const serialized = await connector.export([suppliedProduct]);
    //expect(serialized).toStrictEqual(expected);
});