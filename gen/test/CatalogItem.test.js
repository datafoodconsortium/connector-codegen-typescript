import CatalogItem from '../lib/CatalogItem.js';
import Catalog from '../lib/Catalog.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import Offer from '../lib/Offer.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = ``;

const suppliedProduct = new SuppliedProduct({
    connector: connector,
    semanticId: "http://myplatform.com/suppliedProduct1"
});

const offer1 = new Offer({
    connector: connector,
    semanticId: "http://myplatform.com/offer1"
});

const catalog = new Catalog({
    connector: connector,
    semanticId: "http://myplatform.com/catalog1"
});

const catalogItem = new CatalogItem({
    connector: connector,
    semanticId: "http://myplatform.com/catalogItem1",
    catalogs: [catalog],
    offers: [offer1],
    product: suppliedProduct,
    sku: "sku",
    stockLimitation: 6.32
});

test('CatalogItem:import', async () => {
    const imported = await connector.import(json);
    const importedCatalogItem = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedCatalogItem.equals(catalogItem)).toStrictEqual(true);
});

test('CatalogItem:export', async () => {
    const serialized = await connector.export([catalogItem]);
    console.log(serialized);
    expect(serialized).toStrictEqual(json);
});

test('CatalogItem:getSemanticId', async () => {
    expect(catalogItem.getSemanticId()).toStrictEqual("http://myplatform.com/catalogItem1");
});

test('CatalogItem:getCatalogs', async () => {
    const catalogs = await catalogItem.getCatalogs();
    expect(catalogs.length).toStrictEqual(1);
    expect(catalogs[0].equals(catalog)).toStrictEqual(true);
});

test('CatalogItem:getOfferers', async () => {
    const offers = await catalogItem.getOfferers();
    expect(offers.length).toStrictEqual(1);
    expect(offers[0].equals(offer1)).toStrictEqual(true);
});

test('CatalogItem:getOfferedProduct', async () => {
    const offeredProduct = await catalog.getOfferedProduct();
    expect(offeredProduct.equals(suppliedProduct)).toStrictEqual(true);
});

test('CatalogItem:getSku', async () => {
    expect(catalogItem.getSku()).toStrictEqual("sku");
});

test('CatalogItem:getStockLimitation', async () => {
    expect(catalogItem.getStockLimitation()).toStrictEqual(6.32);
});

test('CatalogItem:registerInCatalog', async () => {
    expect(true).toStrictEqual(false);
});

test('CatalogItem:setSku', async () => {
    catalogItem.setSku("sku2");
    expect(catalogItem.getSku()).toStrictEqual("sku2");
});

test('CatalogItem:setStockLimitation', async () => {
    catalogItem.setStockLimitation(5);
    expect(catalogItem.getStockLimitation()).toStrictEqual(5);
});

test('CatalogItem:setOfferedProduct', async () => {
    const suppliedProduct2 = new SuppliedProduct({
        connector: connector,
        semanticId: "http://myplatform.com/suppliedProduct2"
    });
    const offeredProduct = await catalog.getOfferedProduct();
    expect(offeredProduct.equals(suppliedProduct2)).toStrictEqual(true);
});

test('CatalogItem:addOffer', async () => {
    expect(true).toStrictEqual(false);
});