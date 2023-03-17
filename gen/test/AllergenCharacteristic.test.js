import AllergenCharacteristic from '../lib/AllergenCharacteristic.js';
import Connector from "../lib/Connector.js";
import ConnectorFactory from "../lib/ConnectorFactory.js";
//import facets from '../test/thesaurus/facets.json' assert { type: 'json' };
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

let connector = undefined;

beforeEach(() => {
    connector = new Connector();
    //connector.loadFacets(facets);
    connector.loadMeasures(measures);
    connector.setDefaultFactory(new ConnectorFactory(connector));

});



test('AllergenCharacteristic:import', async () => {
    const expected = `{"@context":{"@vocab":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"},"@id":"_:http://myplatform.com/ac1","@type":"AllergenCharacteristic","hasAllergenDimension":{"@id":"dfc-m:Peanuts"},"hasUnit":{"@id":"dfc-m:Kilogram"},"value":"1"}`;

    const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
    const allergenDimension = connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS;

    // Pb de context, les prefix sont utilisés dans l'ID, il faut voir dans les fichiers RDF
    const allergenCharacteristic = new AllergenCharacteristic({
        semanticId: "http://myplatform.com/ac1",
        connector: connector, 
        value: 1, 
        unit: kilogram, 
        allergenDimension: allergenDimension
    });
    
    const imported = (await connector.import(expected))[0];
    //console.log(imported);
    //console.log(allergenCharacteristic);
    expect(imported.equals(allergenCharacteristic)).toStrictEqual(true);
});

test('AllergenCharacteristic:export', async () => {
    const data = `{"@context":{"rdfs":"http://www.w3.org/2000/01/rdf-schema#","skos":"http://www.w3.org/2004/02/skos/core#","dfc":"http://static.datafoodconsortium.org/ontologies/DFC_FullModel.owl#","dc":"http://purl.org/dc/elements/1.1/#","dfc-b":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#","dfc-p":"http://static.datafoodconsortium.org/ontologies/DFC_ProductOntology.owl#","dfc-t":"http://static.datafoodconsortium.org/ontologies/DFC_TechnicalOntology.owl#","dfc-m":"http://static.datafoodconsortium.org/data/measures.rdf#","dfc-pt":"http://static.datafoodconsortium.org/data/productTypes.rdf#","dfc-f":"http://static.datafoodconsortium.org/data/facets.rdf#","dfc-p:hasUnit":{"@type":"@id"},"dfc-b:hasUnit":{"@type":"@id"},"dfc-b:hasQuantity":{"@type":"@id"},"dfc-p:hasType":{"@type":"@id"},"dfc-b:hasType":{"@type":"@id"},"dfc-b:references":{"@type":"@id"},"dfc-b:referencedBy":{"@type":"@id"},"dfc-b:offeres":{"@type":"@id"},"dfc-b:supplies":{"@type":"@id"},"dfc-b:defines":{"@type":"@id"},"dfc-b:affiliates":{"@type":"@id"},"dfc-b:manages":{"@type":"@id"},"dfc-b:offeredThrough":{"@type":"@id"},"dfc-b:hasBrand":{"@type":"@id"},"dfc-b:hasGeographicalOrigin":{"@type":"@id"},"dfc-b:hasClaim":{"@type":"@id"},"dfc-b:hasAllergenDimension":{"@type":"@id"},"dfc-b:hasNutrimentDimension":{"@type":"@id"},"dfc-b:hasPhysicalDimension":{"@type":"@id"},"dfc:owner":{"@type":"@id"},"dfc-t:hostedBy":{"@type":"@id"},"dfc-t:hasPivot":{"@type":"@id"},"dfc-t:represent":{"@type":"@id"}},"@id":"_:b2","@type":"dfc-b:AllergenCharacteristic","dfc-b:hasAllergenDimension":"dfc-m:Peanuts","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1"}`;

    const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
    const allergenDimension = connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS;

    const allergenCharacteristic = new AllergenCharacteristic({
        connector: connector, 
        value: 1, 
        unit: kilogram, 
        allergenDimension: allergenDimension
    });
    
    const serialized = await connector.export([allergenCharacteristic]);
    //console.log(serialized)
    expect(serialized).toStrictEqual(data);
});