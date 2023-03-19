import Connector from "../lib/Connector.js";
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
//await connector.loadMeasures(JSON.stringify(measures));
const expected = ``;

test('Connector:test', async () => {
    try {
        //console.log(JSON.stringify(measures));
        /*const context = {
            "dfc-m": "http://static.datafoodconsortium.org/data/measures.rdf#",
            "skos": "http://www.w3.org/2004/02/skos/core#",
            "rdf": "http://www.w3.org/2000/01/rdf-schema#"
        }

        const imported = await connector.import(JSON.stringify(measures), { context: context });
        console.log(imported[0]);*/
        //console.log(measures["@graph"]);
        //console.log(connector);
        await connector.loadMeasures(JSON.stringify(measures));
        console.log(connector.MEASURES.UNIT.CURRENCYUNIT.AUSTRALIANDOLLAR)
    }
    catch(e) { console.log(e) }
});