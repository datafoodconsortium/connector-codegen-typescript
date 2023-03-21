import Offer from '../lib/Offer.js';
import SaleSession from '../lib/SaleSession.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const offer = new Offer({
    connector: connector,
    semanticId: "http://myplatform.com/offer1"
});

const saleSession = new SaleSession({
    connector: connector,
    semanticId: "http://myplatform.com/saleSession1",
    beginDate: "beginDate",
    endDate: "endDate",
    quantity: 5,
    offers: [offer]
});

const json = ``;

test('SaleSession:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect(importedAll.length).toStrictEqual(1);
    expect(imported.equals(saleSession)).toStrictEqual(true);
});

test('SaleSession:export', async () => {
    const serialized = await connector.export([saleSession]);
    console.log(serialized);
    expect(serialized).toStrictEqual(json);
});

test('SaleSession:getSemanticId', async () => {
    expect(saleSession.getSemanticId()).toStrictEqual("http://myplatform.com/saleSession1");
});

test('SaleSession:getBeginDate', async () => {
    expect(saleSession.getBeginDate()).toStrictEqual("beginDate");
});

test('SaleSession:getEndDate', async () => {
    expect(saleSession.getEndDate()).toStrictEqual("endDate");
});

test('SaleSession:getQuantity', async () => {
    expect(saleSession.getQuantity()).toStrictEqual(5);
});

test('SaleSession:getOffers', async () => {
    const offers = await saleSession.getOffers();
    expect(offers.length).toStrictEqual(1);
    expect(offers[0].equals(offer)).toStrictEqual(true);
});

test('SaleSession:setBeginDate', async () => {
    saleSession.setBeginDate("beginDate2");
    expect(saleSession.getBeginDate()).toStrictEqual("beginDate2");
});

test('SaleSession:setEndDate', async () => {
    saleSession.setEndDate("endDate2");
    expect(saleSession.getEndDate()).toStrictEqual("endDate2");
});

test('SaleSession:setQuantity', async () => {
    saleSession.setQuantity(2.3);
    expect(saleSession.getQuantity()).toStrictEqual(2.3);
});

test('SaleSession:addOffer', async () => {
    const offer2 = new Offer({
        connector: connector,
        semanticId: "http://myplatform.com/offer2"
    });
    saleSession.addOffer(offer2);
    const offers = await saleSession.getOffers();
    expect(offers.length).toStrictEqual(2);
    expect(offers[1].equals(offer2)).toStrictEqual(true);
});

test('SaleSession:removeOffer', async () => {
    expect(true).toStrictEqual(false);
});