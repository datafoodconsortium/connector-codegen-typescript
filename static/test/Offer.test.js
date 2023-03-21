import Offer from '../lib/Offer.js';
import Price from '../lib/Price.js';
import CustomerCategory from '../lib/CustomerCategory.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import Connector from "../lib/Connector.js";
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
await connector.loadMeasures(JSON.stringify(measures));

const customerCategory = new CustomerCategory({
    connector: connector,
    semanticId: "http://myplatform.com/customerCategory1"
});

const suppliedProduct = new SuppliedProduct({
    connector: connector,
    semanticId: "http://myplatform.com/suppliedProduct1"
});

const price = new Price({
    connector: connector,
    value: 2.54,
    vatRate: 8.0,
    unit: connector.MEASURES.UNIT.CURRENCYUNIT.EURO
});

const offer = new Offer({
    connector: connector,
    semanticId: "http://myplatform.com/offer1",
    offeredItem: suppliedProduct,
    offeredTo: customerCategory,
    price: price,
    stockLimitation: 4.21
});

connector.store(customerCategory);
connector.store(suppliedProduct);

const json = `{"@context":{"rdfs":"http://www.w3.org/2000/01/rdf-schema#","skos":"http://www.w3.org/2004/02/skos/core#","dfc":"http://static.datafoodconsortium.org/ontologies/DFC_FullModel.owl#","dc":"http://purl.org/dc/elements/1.1/#","dfc-b":"http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#","dfc-p":"http://static.datafoodconsortium.org/ontologies/DFC_ProductOntology.owl#","dfc-t":"http://static.datafoodconsortium.org/ontologies/DFC_TechnicalOntology.owl#","dfc-m":"http://static.datafoodconsortium.org/data/measures.rdf#","dfc-pt":"http://static.datafoodconsortium.org/data/productTypes.rdf#","dfc-f":"http://static.datafoodconsortium.org/data/facets.rdf#","dfc-p:hasUnit":{"@type":"@id"},"dfc-b:hasUnit":{"@type":"@id"},"dfc-b:hasQuantity":{"@type":"@id"},"dfc-p:hasType":{"@type":"@id"},"dfc-b:hasType":{"@type":"@id"},"dfc-b:references":{"@type":"@id"},"dfc-b:referencedBy":{"@type":"@id"},"dfc-b:offeres":{"@type":"@id"},"dfc-b:supplies":{"@type":"@id"},"dfc-b:defines":{"@type":"@id"},"dfc-b:affiliates":{"@type":"@id"},"dfc-b:manages":{"@type":"@id"},"dfc-b:offeredThrough":{"@type":"@id"},"dfc-b:hasBrand":{"@type":"@id"},"dfc-b:hasGeographicalOrigin":{"@type":"@id"},"dfc-b:hasClaim":{"@type":"@id"},"dfc-b:hasAllergenDimension":{"@type":"@id"},"dfc-b:hasNutrimentDimension":{"@type":"@id"},"dfc-b:hasPhysicalDimension":{"@type":"@id"},"dfc:owner":{"@type":"@id"},"dfc-t:hostedBy":{"@type":"@id"},"dfc-t:hasPivot":{"@type":"@id"},"dfc-t:represent":{"@type":"@id"}},"@graph":[{"@id":"_:b1","@type":"dfc-b:Price","dfc-b:VATrate":"8","dfc-b:hasUnit":"dfc-m:Euro","dfc-b:value":"2.54"},{"@id":"http://myplatform.com/offer1","@type":"dfc-b:Offer","dfc-b:offeredItem":{"@id":"http://myplatform.com/suppliedProduct1"},"dfc-b:offeredTo":{"@id":"http://myplatform.com/customerCategory1"},"dfc-b:price":{"@id":"_:b1"},"dfc-b:stockLimitation":"4.21"}]}`;

test('Offer:export', async () => {
    const serialized = await connector.export([offer]);
    expect(serialized).toStrictEqual(json);
});

test('Offer:import', async () => {
    const imported = await connector.import(json);
    const importedOffer = imported[0];
    
    expect(imported.length).toStrictEqual(1);
    expect(importedOffer.equals(offer)).toStrictEqual(true);
});

test('Offer:getSemanticId', async () => {
    expect(offer.getSemanticId()).toStrictEqual("http://myplatform.com/offer1");
});

test('Offer:getOfferedItem', async () => {
    const expected = await offer.getOfferedItem();
    expect(expected.equals(suppliedProduct)).toStrictEqual(true);
});

test('Offer:getOfferedTo', async () => {
    const expected = await offer.getCustomerCategory();
    expect(expected.equals(customerCategory)).toStrictEqual(true);
});

test('Offer:getPrice', async () => {
    const expected = await offer.getPrice();
    expect(expected.equals(price)).toStrictEqual(true);
});

test('Offer:getStockLimitation', async () => {
    expect(offer.getStockLimitation()).toStrictEqual(4.21);
});

test('Offer:setOfferedItem', async () => {
    const expected = new SuppliedProduct({
        connector: connector,
        semanticId: "http://myplatform.com/suppliedProductSet"
    });

    offer.setOfferedItem(expected);
    
    const received = await offer.getOfferedItem();
    expect(received.equals(expected)).toStrictEqual(true);
});

test('Offer:setOfferedTo', async () => {
    const expected = new CustomerCategory({
        connector: connector,
        semanticId: "http://myplatform.com/customerCategory1"
    });

    offer.setCustomerCategory(expected);
    
    const received = await offer.getCustomerCategory();
    expect(received.equals(expected)).toStrictEqual(true);
});

test('Offer:setPrice', async () => {
    const expected = new Price({
        connector: connector,
        value: 3,
        vatRate: 19.0,
        unit: connector.MEASURES.UNIT.CURRENCYUNIT.EURO
    });

    offer.setPrice(expected);
    
    const received = await offer.getPrice();
    expect(received.equals(expected)).toStrictEqual(true);
});

test('Offer:setStockLimitation', async () => {
    offer.setStockLimitation(5);
    expect(offer.getStockLimitation()).toStrictEqual(5);
});