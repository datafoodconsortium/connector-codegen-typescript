import { Semanticable } from "@virtual-assembly/semantizer";
import Address from "./Address.js";
import Catalog from "./Catalog.js";
import SaleSession from "./SaleSession.js";
import Order from "./Order.js";
import OrderLine from "./OrderLine.js";
import AllergenCharacteristic from "./AllergenCharacteristic.js";
import CatalogItem from "./CatalogItem.js";
import CustomerCategory from "./CustomerCategory.js";
import Enterprise from "./Enterprise.js";
import IConnectorFactory from "./IConnectorFactory.js";
import NutrientCharacteristic from "./NutrientCharacteristic.js";
import Offer from "./Offer.js";
import Person from "./Person.js";
import PhysicalCharacteristic from "./PhysicalCharacteristic.js";
import Price from "./Price.js";
import QuantitativeValue from "./QuantitativeValue.js";
import SKOSConcept from "./SKOSConcept.js";
import SuppliedProduct from "./SuppliedProduct.js";
import Localizable from "./Localizable.js";
import IConnector from "./IConnector.js";
import DatasetExt from "rdf-ext/lib/Dataset.js";
import { DatasetCore } from '@rdfjs/types';

export default class ConnectorFactory implements IConnectorFactory {

    private connector: IConnector;

    public constructor(connector: IConnector) {
        this.connector = connector;
    }

    public createFromRdfDatasetCore(dataset: DatasetCore): Semanticable | undefined {
        const datasetExt = new DatasetExt();
        datasetExt.addAll(dataset);
        return this.createFromRdfDataset(datasetExt);
    }
    
    public createAddress(parameters: any): Localizable {
        throw new Error("Method not implemented.");
    }

    public createFromType(type: string): Semanticable | undefined {
        let result: Semanticable | undefined = undefined;
        const prefix: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#";
        switch (type) {
            case prefix + "Enterprise":
                result = new Enterprise({ connector: this.connector, semanticId: "" });
                break;
            
            case prefix + "Address":
                result = new Address({ connector: this.connector, semanticId: "" });
                break;

            case prefix + "Person":
                result = new Person({ connector: this.connector, semanticId: "" });
                break;
            
            case prefix + "CustomerCategory":
                result = new CustomerCategory({ connector: this.connector, semanticId: "" });
                break;

            case prefix + "QuantitativeValue":
                result = new QuantitativeValue({ connector: this.connector });
                break;
            
            case prefix + "AllergenCharacteristic":
                result = new AllergenCharacteristic({ connector: this.connector });
                break;

            case prefix + "NutrientCharacteristic":
                result = new NutrientCharacteristic({ connector: this.connector });
                break;
            
            case prefix + "PhysicalCharacteristic":
                result = new PhysicalCharacteristic({ connector: this.connector });
                break;

            case prefix + "SuppliedProduct":
                result = new SuppliedProduct({ connector: this.connector, semanticId: "" });
                break;
            
            case prefix + "Price":
                result = new Price({ connector: this.connector });
                break;

            case prefix + "Catalog":
                result = new Catalog({ connector: this.connector, semanticId: "" });
                break;

            case prefix + "CatalogItem":
                result = new CatalogItem({ connector: this.connector, semanticId: "" });
                break;
            
            case prefix + "Offer":
                result = new Offer({ connector: this.connector, semanticId: "" });
                break;

            case prefix + "Order":
                result = new Order({ connector: this.connector, semanticId: "" });
                break;

            case prefix + "OrderLine":
                result = new OrderLine({ connector: this.connector, semanticId: "" });
                break;

            case prefix + "SaleSession":
                result = new SaleSession({ connector: this.connector, semanticId: "" });
                break;

            case "http://www.w3.org/2004/02/skos/core#Concept":
                result = new SKOSConcept({ connector: this.connector });
                break;

            case "http://www.w3.org/2004/02/skos/core#ConceptScheme":
                result = new SKOSConcept({ connector: this.connector });
                // @ts-ignore
                result._semanticType = "http://www.w3.org/2004/02/skos/core#ConceptScheme";
                break;
        
            default:
                console.log(type);
                break;
        }

        //if (!result)
          //  throw new Error;

        return result;
    }

    public createFromRdfDataset(dataset: DatasetExt): Semanticable | undefined {
        const rdfType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
        const quad = Array.from(dataset.filter((quad: any) => quad.predicate.value === rdfType))[0];
        const type = quad.object.value;
        const semanticObject: Semanticable | undefined = this.createFromType(type);
        if (semanticObject) 
            semanticObject.setSemanticPropertyAllFromRdfDataset(dataset);
        return semanticObject;
    }
    
}