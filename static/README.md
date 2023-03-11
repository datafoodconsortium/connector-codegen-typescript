The Data Food Connector is a tool to help you to integrate the DFC standard within you application. Each concept of the DFC ontology can be manipulated with the help of the corresponding class supplied by the connector.

This connector will also help you to generate the JSON-LD required by the other DFC compliant platforms to exchange data.

The [Data Food Consortium](https://datafoodconsortium.org) project (DFC) aims to provide interoperability between food supply chain platforms. We use the semantizer library inside our connector library to help developers to exchange JSON-LD data expressed with the DFC ontology.

# Get started

## Setup

### Install

You can install the connector with the following command: `npm i @datafoodconsortium/connector`.

### Import
Then in you JS file, import the newly installed connector:
```JS
import { connector } from '@datafoodconsortium/connector';
```

_Remark: the connector is a singleton._

### Configure

In order to be able to import data, you must provide a valid factory like:
```JS
import { ConnectorFactory } from '@datafoodconsortium/connector';

connector.setDefaultFactory(new ConnectorFactory());
```

You can also adapt different components of the connector to your needs with the following functions:

```JS
// Set the function that fetch the referenced objects when importing data.
public setDefaultFetchFunction(fetch: (semanticId: string) => Promise<string>): void;

// Set the object that will export the objects.
public setDefaultExporter(exporter: IConnectorExporter);

// Set the object that will import the objects.
public setDefaultImporter(importer: IConnectorImporter);

// Set the object that will store the imported objects.
public setDefaultStore(store: IConnectorStore): void;
```

### Load the taxonomies

You can then load our different SKOS taxonomies providing the corresponding JSON-LD files:
```JS
connector.loadMeasures(JSON.parse(File.read("/path/to/measures.json")))
connector.loadFacets(JSON.parse(File.read("/path/to/facets.json")))
connector.loadProductTypes(JSON.parse(File.read("/path/to/productTypes.json")))
```

## Object creation

Before to create the following example product, be sure to import the required classes:
```JS
import { 
    connector, 
    QuantitativeValue, 
    SuppliedProduct, 
    AllergenCharacteristic,
    NutrientCharacteristic,
    PhysicalCharacteristic
} from "@datafoodconsortium/connector";
```

Units are directly accessible from the connector like:
```JS
const gram = connector.MEASURES.UNIT.QUANTITYUNIT.GRAM;
const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
```

Then you can create product like:
```JS
let suppliedProduct = new SuppliedProduct({
  semanticId: "https://myplatform.com/tomato",
  name: "Tomato", 
  description: "Awesome tomato",
  productType: connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO, 
  quantity: new QuantitativeValue(kilogram, 1), 
  alcoholPercentage: 0.0, 
  lifetime: "a week", 
  claims: [connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS], 
  usageOrStorageConditions: "free text", 
  allergenCharacteristics: [new AllergenCharacteristic(kilogram, 1, connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS)],
  nutrientCharacteristics: [new NutrientCharacteristic(gram, 10, connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM)],
  physicalCharacteristics: [new PhysicalCharacteristic(gram, 100, connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT)],
  geographicalOrigin: connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.CENTREVALLOIRE,
  catalogItems: [new CatalogItem({ semanticId: "https://myplatform.com/catalogItem" })], 
  certifications: [connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB],
  natureOrigin: [connector.FACETS.NATUREORIGIN.PLANTORIGIN],
  partOrigin: [connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT]
});
```

_Remark: the `semanticId` constructor parameter is mandatory. All the other parameters are optional._

## Object accessors and mutators

### Read object properties
You can read the properties of an objet using getter methods like:
```JS
suppliedProduct.getDescription();
```

The previous method returned a simple string. But an object ofen contains other objects. In the semantic web, every object has its own URI. So we will store only a reference to these contained objects using their URI. They are called "referenced objects".

To access a referenced object using the connector you just have to `await` for it like:
```JS
const addresses: Localizable[] = await person.getLocalizations();
```

Running the previous code sample will trigger a call to the `fetch` function of the connector. If the referenced object it is not already in the connector store, it will be downloaded from the network.

### Change object properties

If you want to change a property after the creation of the object, you can use the proper setter methods like:
```JS
// Set the quantity of the product
suppliedProduct.setQuantity(new QuantitativeValue(kilogram, 2.6));
```

You can also add value to array properties:
```JS
// Add a new certification to the product
suppliedProduct.addCertification(connector.FACETS.CERTIFICATION.LOCALLABEL.AOC_FR);
```

## Export objects to JSON-LD
To finish you can export the DFC object to JSON-LD with:
```JS
console.log(await connector.export([suppliedProduct]));
```

_Remark: the export function accepts an "options" parameter that can be use to pass a custom exporter: `options?: { exporter?: IConnectorExporter }`._

This will output DFC compliant valid JSON-LD like:
```JS
{
  "@context": {
    "dfc-b": "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#"
  },
  "@id": "https://myplatform.com/tomato",
  "@type": "dfc-b:SuppliedProduct",
  "dfc-b:description": "Awesome tomato",
  "dfc-b:hasAllergenCharacteristic": [
    {
      "@type": "dfc-b:AllergenCharacteristic",
      "dfc-b:hasAllergenDimension": "dfc-m:Peanuts",
      "dfc-b:hasUnit": "dfc-m:Kilogram",
      "dfc-b:value": 1
    },
    {
      "@type": "dfc-b:AllergenCharacteristic",
      "dfc-b:hasAllergenDimension": "dfc-m:Mustard",
      "dfc-b:hasUnit": "dfc-m:Kilogram",
      "dfc-b:value": 23
    }
  ],
  "dfc-b:hasCertification": [
    "dfc-f:AOC_FR",
    "dfc-f:Organic-AB"
  ],
  "dfc-b:hasClaim": [
    "dfc-f:NoAddedSugars",
    "dfc-f:LowSodiumSalt"
  ],
  "dfc-b:hasGeographicalOrigin": "dfc-f:CentreValLoire",
  "dfc-b:hasNatureOrigin": "dfc-f:PlantOrigin",
  "dfc-b:hasNutrientCharacteristic": {
    "@type": "dfc-b:NutrientCharacteristic",
    "dfc-b:hasNutrientDimension": "dfc-m:Calcium",
    "dfc-b:hasUnit": "dfc-m:Gram",
    "dfc-b:value": 10
  },
  "dfc-b:hasPartOrigin": "dfc-f:Fruit",
  "dfc-b:hasPhysicalCharacteristic": {
    "@type": "dfc-b:PhysicalCharacteristic",
    "dfc-b:hasPhysicalDimension": "dfc-m:Weight",
    "dfc-b:hasUnit": "dfc-m:Gram",
    "dfc-b:value": 100
  },
  "dfc-b:hasQuantity": {
    "@type": "dfc-b:QuantitativeValue",
    "dfc-b:hasUnit": "dfc-m:Kilogram",
    "dfc-b:value": 1
  },
  "dfc-b:hasType": "http://static.datafoodconsortium.org/data/productTypes.rdf#round-tomato",
  "dfc-b:name": "Tomate",
  "dfc-b:referencedBy": []
}
```

## Import objects from JSON-LD

To import objects from JSON-LD, use:
```JS
const objects: Semanticable[] = await connector.import(jsonAsAString));
```

_Remark: the import function accepts an "options" parameter that can be use to pass a custom importer and a custom factory: `options?: { importer?: IConnectorImporter, factory?: IConnectorFactory }`._

## Available classes

You can create the following objets:
- `Address`
- `AllergenCharacteristic`
- `Catalog`
- `CatalogItem`
- `CustomerCategory`
- `Enterprise`
- `NutrientCharacteristic`
- `Offer`
- `Order`
- `OrderLine`
- `Person`
- `PhysicalCharacteristic`
- `Price`
- `QuantitativeValue`
- `SaleSession`
- `SuppliedProduct`

To get a quick view of what parameter can be passed to the constructor of these objects, you can use the [1.8 JSON example](https://datafoodconsortium.gitbook.io/dfc-standard-documentation/appendixes/practical-examples/version-1.8).