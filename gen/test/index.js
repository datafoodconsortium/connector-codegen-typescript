import CatalogItem from '../lib/CatalogItem.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import QuantitativeValue from '../lib/QuantitativeValue.js';
import AllergenCharacteristic from '../lib/AllergenCharacteristic.js';
import NutrientCharacteristic from '../lib/NutrientCharacteristic.js';
import PhysicalCharacteristic from '../lib/PhysicalCharacteristic.js';
import Connector from "../lib/Connector.js";

import facets from '../test/thesaurus/facets.json' assert { type: 'json' };
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };
import productTypes from '../test/thesaurus/productTypes.json' assert { type: 'json' };

const connector = new Connector();
//await connector.loadFacets(JSON.stringify(facets));
//await connector.loadMeasures(JSON.stringify(measures));
connector.loadProductTypes(JSON.stringify(productTypes));

//const gram = connector.MEASURES.UNIT.QUANTITYUNIT.GRAM;
//const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;

/*let suppliedProduct = new SuppliedProduct({
    connector: connector,
    semanticId: "https://myplatform.com/tomato",
    //name: "Tomato", 
    //description: "Awesome tomato",
    //productType: connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO, 
    //quantity: new QuantitativeValue({ quantity: 1, unit: kilogram }),
    //alcoholPercentage: 0.0, 
    //lifetime: "a week", 
    //claims: [connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS], 
    //usageOrStorageConditions: "free text", 
    //allergenCharacteristics: [new AllergenCharacteristic({ value: 1, unit: kilogram, allergenDimension: connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS })],
    //nutrientCharacteristics: [new NutrientCharacteristic({ value: 10, unit: gram, nutrientDimension: connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM })],
    //physicalCharacteristics: [new PhysicalCharacteristic({ value: 100, unit: gram, physicalDimension: connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT })],
    geographicalOrigin: connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.CENTREVALLOIRE,
    //catalogItems: [new CatalogItem({ semanticId: "https://myplatform.com/catalogItem" })], 
    //certifications: [connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB, connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU],
    //natureOrigin: [connector.FACETS.NATUREORIGIN.PLANTORIGIN],
    //partOrigin: [connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT]
});

const got = await suppliedProduct.getGeographicalOrigin();
console.log(got.equals(connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.CENTREVALLOIRE));
*/
console.log("FINISH");