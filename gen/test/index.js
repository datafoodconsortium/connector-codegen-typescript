import CatalogItem from '../lib/CatalogItem.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import QuantitativeValue from '../lib/QuantitativeValue.js';
import AllergenCharacteristic from '../lib/AllergenCharacteristic.js';
import NutrientCharacteristic from '../lib/NutrientCharacteristic.js';
import PhysicalCharacteristic from '../lib/PhysicalCharacteristic.js';
import Connector from "../lib/Connector.js";
import ConnectorImporterJsonldStream from "../lib/ConnectorImporterJsonldStream.js";
import context from "../lib/context.js";

const connector = new Connector();

/*
class Loader {
    async load(url) {
        return {
            "@context": context
        }
    }
}
const importer = new ConnectorImporterJsonldStream({ documentLoader: new Loader() });

const data = `{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@graph":[{"@id":"_:b1","@type":"dfc-b:Price","dfc-b:VATrate":"8","dfc-b:hasUnit":"dfc-m:Euro","dfc-b:value":"2.54"},{"@id":"http://myplatform.com/offer1","@type":"dfc-b:Offer","dfc-b:offeredItem":{"@id":"http://myplatform.com/suppliedProduct1"},"dfc-b:offeredTo":{"@id":"http://myplatform.com/customerCategory1"},"dfc-b:price":{"@id":"_:b1"},"dfc-b:stockLimitation":"4.21"}]}`;

const imported = await connector.import(data, { importer: importer });
const expected = imported[0];
console.log(expected);
*/

/*
const data = `[
    {
      "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#tomato",
      "@type": [
        "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#SuppliedProduct"
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasType": [
        {
          "@id": "http://static.datafoodconsortium.org/data/productTypes.rdf#hierloom-tomato"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#description": [
        {
          "@value": "Tomato"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCertification": [
        {
          "@id": "http://static.datafoodconsortium.org/data/facets.rdf#Organic-AB"
        }
      ]
    },
    {
      "@id": "_:n3-0",
      "@type": [
        "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#QuantitativeValue"
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasUnit": [
        {
          "@id": "http://static.datafoodconsortium.org/data/measures.rdf#Kilogram"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#value": [
        {
          "@value": "1",
          "@type": "http://www.w3.org/2001/XMLSchema#integer"
        }
      ]
    },
    {
      "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#tomato",
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasQuantity": [
        {
          "@id": "_:n3-0"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#image": [
        {
          "@id": "http://localhost:8000/lecoqlibre/mycelium/images/tomato.png"
        }
      ]
    },
    {
      "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#catalogItem1",
      "@type": [
        "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#CatalogItem"
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#references": [
        {
          "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#tomato"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#sku": [
        {
          "@value": "catalog item gtin or sku"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation": [
        {
          "@value": "24",
          "@type": "http://www.w3.org/2001/XMLSchema#integer"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredThrough": [
        {
          "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#offer1"
        }
        ,
        {
          "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#offer2"
        }
      ]
    },
    {
      "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#offer1",
      "@type": [
        "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Offer"
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredTo": [
        {
          "@id": "http://localhost:8000/lecoqlibre/mycelium/agents/customerCategories.tll#default"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offers": [
        {
          "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#catalogItem1"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPrice": [
        {
          "@id": "_:price1"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation": [
        {
          "@value": "12",
          "@type": "http://www.w3.org/2001/XMLSchema#integer"
        }
      ]
    },
    {
      "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#offer2",
      "@type": [
        "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Offer"
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offeredTo": [
        {
          "@id": "http://localhost:8000/lecoqlibre/mycelium/agents/customerCategories.ttl#default"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#offers": [
        {
          "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#catalogItem1"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPrice": [
        {
          "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#_:price2"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#stockLimitation": [
        {
          "@value": "10",
          "@type": "http://www.w3.org/2001/XMLSchema#integer"
        }
      ]
    },
    {
      "@id": "_:price1",
      "@type": [
        "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Price"
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#value": [
        {
          "@value": "3.4",
          "@type": "http://www.w3.org/2001/XMLSchema#decimal"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATrate": [
        {
          "@value": "8",
          "@type": "http://www.w3.org/2001/XMLSchema#integer"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasUnit": [
        {
          "@id": "http://static.datafoodconsortium.org/data/measures.rdf#Euro"
        }
      ]
    },
    {
      "@id": "http://localhost:8000/lecoqlibre/mycelium/catalogs/default/products/tomato.ttl#_:price2",
      "@type": [
        "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Price"
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#value": [
        {
          "@value": "5.4",
          "@type": "http://www.w3.org/2001/XMLSchema#decimal"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#VATrate": [
        {
          "@value": "8",
          "@type": "http://www.w3.org/2001/XMLSchema#integer"
        }
      ],
      "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasUnit": [
        {
          "@id": "http://static.datafoodconsortium.org/data/measures.rdf#Euro"
        }
      ]
    }
  ]
  `;

const imported = await connector.import(data);
//const expected = imported[0];
 console.log(imported[2]);
 */

const enterprise = connector.createEnterprise({
  semanticId: "entreprise",
  description: "desc",
  suppliedProducts: [connector.createSuppliedProduct({semanticId: "sp", description: "sp"})]
})

console.log(enterprise);