import Person from '../lib/Person.js';
import Address from '../lib/Address.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const address = new Address({
    connector: connector,
    semanticId: "http://myplatform.com/address/address1"
});

const person = new Person({
    connector: connector,
    semanticId: "http://myplatform.com/person1",
    firstName: "John",
    lastName: "Smith"
});

const json = ``;

test('Person:import', async () => {
    const imported = await connector.import(json);
    const importedPerson = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedPerson.equals(person)).toStrictEqual(true);
});

test('Person:export', async () => {
    const serialized = await connector.export([person]);
    console.log(serialized);
    expect(serialized).toStrictEqual(json);
});

test('Person:getSemanticId', async () => {
    expect(person.getSemanticId()).toStrictEqual("http://myplatform.com/person1");
});

test('Person:getFirstName', async () => {
    expect(person.getFirstName()).toStrictEqual("John");
});

test('Person:getLastName', async () => {
    expect(person.getLastName()).toStrictEqual("Smith");
});

test('Person:getLocalizations', async () => {
    const localizations = await person.getLocalizations();
    expect(localizations.length).toStrictEqual(1);
    expect(localizations[0].equals(address)).toStrictEqual(true);
});

test('Person:setFirstName', async () => {
    person.setFirstName("John2");
    expect(person.getFirstName()).toStrictEqual("John2");
});

test('Person:setLastName', async () => {
    person.setLastName("Smith2");
    expect(person.getLastName()).toStrictEqual("Smith2");
});