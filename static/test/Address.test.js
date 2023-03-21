import Address from '../lib/Address.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const address = new Address({
    connector: connector,
    semanticId: "http://myplatform.com/address/address1",
    street: "1, place or Europe",
    postalCode: "00001",
    city: "Brussels",
    country: "Belgium",
});

const data = `{"@context":{"rdfs":"http://www.w3.org/2000/01/rdf-schema#","skos":"http://www.w3.org/2004/02/skos/core#","dfc":"http://static.datafoodconsortium.org/ontologies/DFC_FullModel.owl#","dc":"http://purl.org/dc/elements/1.1/#","dfc-b":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#","dfc-p":"http://static.datafoodconsortium.org/ontologies/DFC_ProductOntology.owl#","dfc-t":"http://static.datafoodconsortium.org/ontologies/DFC_TechnicalOntology.owl#","dfc-m":"http://static.datafoodconsortium.org/data/measures.rdf#","dfc-pt":"http://static.datafoodconsortium.org/data/productTypes.rdf#","dfc-f":"http://static.datafoodconsortium.org/data/facets.rdf#","dfc-p:hasUnit":{"@type":"@id"},"dfc-b:hasUnit":{"@type":"@id"},"dfc-b:hasQuantity":{"@type":"@id"},"dfc-p:hasType":{"@type":"@id"},"dfc-b:hasType":{"@type":"@id"},"dfc-b:references":{"@type":"@id"},"dfc-b:referencedBy":{"@type":"@id"},"dfc-b:offeres":{"@type":"@id"},"dfc-b:supplies":{"@type":"@id"},"dfc-b:defines":{"@type":"@id"},"dfc-b:affiliates":{"@type":"@id"},"dfc-b:manages":{"@type":"@id"},"dfc-b:offeredThrough":{"@type":"@id"},"dfc-b:hasBrand":{"@type":"@id"},"dfc-b:hasGeographicalOrigin":{"@type":"@id"},"dfc-b:hasClaim":{"@type":"@id"},"dfc-b:hasAllergenDimension":{"@type":"@id"},"dfc-b:hasNutrimentDimension":{"@type":"@id"},"dfc-b:hasPhysicalDimension":{"@type":"@id"},"dfc:owner":{"@type":"@id"},"dfc-t:hostedBy":{"@type":"@id"},"dfc-t:hasPivot":{"@type":"@id"},"dfc-t:represent":{"@type":"@id"}},"@id":"http://myplatform.com/address/address1","@type":"dfc-b:Address","dfc-b:hasCity":"Brussels","dfc-b:hasCountry":"Belgium","dfc-b:hasPostalCode":"00001","dfc-b:hasStreet":"1, place or Europe"}`;

test('Address:import', async () => {
    const imported = await connector.import(data);
    const expected = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(expected.equals(address)).toStrictEqual(true);
});

test('Address:export', async () => {   
    const serialized = await connector.export([address]);
    expect(serialized).toStrictEqual(data);
});

test('Address:getSemanticId', async () => {
    expect(address.getSemanticId()).toStrictEqual("http://myplatform.com/address/address1");
});

test('Address:getStreet', async () => {
    expect(address.getStreet()).toStrictEqual("1, place or Europe");
});

test('Address:getPostalCode', async () => {
    expect(address.getPostalCode()).toStrictEqual("00001");
});

test('Address:getCity', async () => {
    expect(address.getCity()).toStrictEqual("Brussels");
});

test('Address:getCountry', async () => {
    expect(address.getCountry()).toStrictEqual("Belgium");
});

test('Address:setStreet', async () => {
    address.setStreet("21, place or Europe");
    expect(address.getStreet()).toStrictEqual("21, place or Europe");
});

test('Address:setPostalCode', async () => {
    address.setPostalCode("00002");
    expect(address.getPostalCode()).toStrictEqual("00002");
});

test('Address:setCity', async () => {
    address.setCity("Paris");
    expect(address.getCity()).toStrictEqual("Paris");
});

test('Address:setCountry', async () => {
    address.setCountry("France");
    expect(address.getCountry()).toStrictEqual("France");
});