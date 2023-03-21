import Order from '../lib/Order.js';
import Person from '../lib/Person.js';
import SaleSession from '../lib/SaleSession.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const customer = new Person({
    connector: connector,
    semanticId: "http://myplatform.com/person1",
});

const saleSession = new SaleSession({
    connector: connector,
    semanticId: "http://myplatform.com/saleSession1"
});

const order = new Order({
    connector: connector,
    semanticId: "http://myplatform.com/order1",
    number: "0001",
    date: "date",
    saleSession: saleSession,
    client: customer
});

const json = ``;

test('Order:import', async () => {
    const imported = await connector.import(json);
    const importedOrder = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedOrder.equals(order)).toStrictEqual(true);
});

test('Order:export', async () => {
    const serialized = await connector.export([order]);
    console.log(serialized);
    expect(serialized).toStrictEqual(json);
});

test('Order:getSemanticId', async () => {
    expect(order.getSemanticId()).toStrictEqual("http://myplatform.com/order1");
});

test('Order:getNumber', async () => {
    expect(order.getNumber()).toStrictEqual("0001");
});

test('Order:getDate', async () => {
    expect(order.getDate()).toStrictEqual("date");
});

test('Order:getSaleSession', async () => {
    const expected = await order.getSaleSession();
    expect(expected.equals(saleSession)).toStrictEqual(true);
});

test('Order:getClient', async () => {
    const expected = await order.getClient();
    expect(expected.equals(customer)).toStrictEqual(true);
});

test('Order:setNumber', async () => {
    order.setNumber("0002");
    expect(order.getNumber()).toStrictEqual("0002");
});

test('Order:setDate', async () => {
    order.setDate("date2");
    expect(order.getDate()).toStrictEqual("date2");
});

test('Order:setSaleSession', async () => {
    const saleSession2 = new SaleSession({
        connector: connector,
        semanticId: "http://myplatform.com/saleSession2"
    });
    const expected = await order.getSaleSession();
    expect(expected.equals(saleSession2)).toStrictEqual(true);
});

test('Order:setClient', async () => {
    const customer2 = new Person({
        connector: connector,
        semanticId: "http://myplatform.com/person12",
    });
    const expected = await order.getClient();
    expect(expected.equals(customer2)).toStrictEqual(true);
});