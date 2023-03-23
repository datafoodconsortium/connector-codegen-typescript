import Enterprise from '../lib/Enterprise.js';
import Address from '../lib/Address.js';
import CustomerCategory from '../lib/CustomerCategory.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import CatalogItem from '../lib/CatalogItem.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const address = new Address({
    connector: connector,
    semanticId: "http://myplatform.com/address1",
    city: "Briouze"
});

const customerCategory = new CustomerCategory({
    connector: connector,
    semanticId: "http://myplatform.com/customerCategory1"
});

const suppliedProduct = new SuppliedProduct({
    connector: connector,
    semanticId: "http://myplatform.com/suppliedProduct1"
});

const catalogItem = new CatalogItem({
    connector: connector,
    semanticId: "http://myplatform.com/catalogItem1"
});

const enterprise = new Enterprise({
    connector: connector,
    semanticId: "http://myplatform.com/enterprise1",
    description: "description",
    localizations: [address],
    vatNumber: "vatNumber",
    customerCategories: [customerCategory],
    suppliedProducts: [suppliedProduct],
    //technicalProducts: [],
    catalogItems: [catalogItem]
});

const json = ``;

test('Enterprise:import', async () => {
    const imported = await connector.import(json);
    const importedEnterprise = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedEnterprise.equals(enterprise)).toStrictEqual(true);
});

test('Enterprise:export', async () => {
    const serialized = await connector.export([enterprise]);
    console.log(serialized);
    expect(serialized).toStrictEqual(json);
});

test('Enterprise:getSemanticId', async () => {
    expect(enterprise.getSemanticId()).toStrictEqual("http://myplatform.com/enterprise1");
});

test('Enterprise:getDescription', async () => {
    expect(enterprise.getDescription()).toStrictEqual("description");
});

test('Enterprise:getLocalizations', async () => {
    const localizations = await enterprise.getLocalizations();
    expect(localizations.length).toStrictEqual(1);
    expect(localizations[0].equals(address)).toStrictEqual(true);
});

test('Enterprise:getVatNumber', async () => {
    expect(enterprise.getVatNumber()).toStrictEqual("vatNumber");
});

test('Enterprise:getCustomerCategories', async () => {
    const customerCategories = await enterprise.getCustomerCategories();
    expect(customerCategories.length).toStrictEqual(1);
    expect(customerCategories[0].equals(customerCategory)).toStrictEqual(true);
});

test('Enterprise:getSuppliedProducts', async () => {
    const suppliedProducts = await enterprise.getSuppliedProducts();
    expect(suppliedProducts.length).toStrictEqual(1);
    expect(suppliedProducts[0].equals(suppliedProduct)).toStrictEqual(true);
});

test('Enterprise:getCatalogItems', async () => {
    const catalogItems = await enterprise.getCatalogItems();
    expect(catalogItems.length).toStrictEqual(1);
    expect(catalogItems[0].equals(catalogItem)).toStrictEqual(true);
});

test('Enterprise:setDescription', async () => {
    enterprise.setDescription("description2");
    expect(enterprise.getDescription()).toStrictEqual("description2");
});

test('Enterprise:addLocalization', async () => {
    const address2 = new Address({
        connector: connector,
        semanticId: "http://myplatform.com/address2",
    });
    enterprise.addLocalization(address2);
    const localizations = await enterprise.getLocalizations();
    expect(localizations.length).toStrictEqual(2);
    expect(localizations[1].equals(address2)).toStrictEqual(true);
});

test('Enterprise:setVatNumber', async () => {
    expect(enterprise.getVatNumber()).toStrictEqual("vatNumber");
});

test('Enterprise:addCustomerCategory', async () => {
    const customerCategory2 = new CustomerCategory({
        connector: connector,
        semanticId: "http://myplatform.com/customerCategory2"
    });
    enterprise.addCustomerCategory(customerCategory2);
    const customerCategories = await enterprise.getCustomerCategories();
    expect(customerCategories.length).toStrictEqual(2);
    expect(customerCategories[1].equals(customerCategory2)).toStrictEqual(true);
});

test('Enterprise:addSuppliedProduct', async () => {
    const suppliedProduct2 = new SuppliedProduct({
        connector: connector,
        semanticId: "http://myplatform.com/suppliedProduct2"
    });
    enterprise.addSupplyProduct(suppliedProduct2);
    const suppliedProducts = await enterprise.getSuppliedProducts();
    expect(suppliedProducts.length).toStrictEqual(2);
    expect(suppliedProducts[1].equals(suppliedProduct2)).toStrictEqual(true);
});

test('Enterprise:addCatalogItem', async () => {
    const catalogItem2 = new CatalogItem({
        connector: connector,
        semanticId: "http://myplatform.com/catalogItem2"
    });
    enterprise.addCatalogItem(catalogItem2);
    const catalogItems = await enterprise.getCatalogItems();
    expect(catalogItems.length).toStrictEqual(2);
    expect(catalogItems[1].equals(catalogItem2)).toStrictEqual(true);
});