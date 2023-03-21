import Catalog from '../lib/Catalog.js';
import CatalogItem from '../lib/CatalogItem.js';
import Enterprise from '../lib/Enterprise.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = `{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@id":"http://myplatform.com/catalog1","@type":"dfc-b:Catalog","dfc-b:maintainedBy":"http://myplatform.com/enterprise1","dfc-b:lists":"http://myplatform.com/catalogItem1"}`;

const enterprise = new Enterprise({
    connector: connector,
    semanticId: "http://myplatform.com/enterprise1"
});

const catalogItem = new CatalogItem({
    connector: connector,
    semanticId: "http://myplatform.com/catalogItem1"
});

const catalog = new Catalog({
    connector: connector,
    semanticId: "http://myplatform.com/catalog1",
    maintainers: [enterprise],
    items: [catalogItem]
});

test('Catalog:import', async () => {
    const imported = await connector.import(json);
    const importedCatalog = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedCatalog.equals(catalog)).toStrictEqual(true);
});

test('Catalog:export', async () => {
    const serialized = await connector.export([catalog]);
    expect(serialized).toStrictEqual(json);
});

test('Catalog:getSemanticId', async () => {
    expect(catalog.getSemanticId()).toStrictEqual("http://myplatform.com/catalog1");
});

test('Catalog:getMaintainers', async () => {
    const maintainers = await catalog.getMaintainers();
    expect(maintainers.length).toStrictEqual(1);
    expect(maintainers[0].equals(enterprise)).toStrictEqual(true);
});

test('Catalog:getItems', async () => {
    const items = await catalog.getItems();
    expect(items.length).toStrictEqual(1);
    expect(items[0].equals(catalogItem)).toStrictEqual(true);
});

test('Catalog:addMaintainer', async () => {
    expect(true).toStrictEqual(false);
});

test('Catalog:addItem', async () => {
    expect(true).toStrictEqual(false);
});

test('Catalog:removeMaintainer', async () => {
    expect(true).toStrictEqual(false);
});

test('Catalog:removeItem', async () => {
    expect(true).toStrictEqual(false);
});