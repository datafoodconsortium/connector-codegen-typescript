import { Semanticable } from "@virtual-assembly/semantizer";
import DatasetExt from "rdf-ext/lib/Dataset";
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

export default class ConnectorFactory implements IConnectorFactory {

    public createFromType(type: string): Semanticable {
        let result: Semanticable | undefined = undefined;
        const prefix: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#";
        switch (type) {
            case prefix + "Enterprise":
                result = new Enterprise({semanticId: ""});
                break;
            
            case prefix + "Address":
                result = new Address({semanticId: ""});
                break;

            case prefix + "Person":
                result = new Person({semanticId: ""});
                break;
            
            case prefix + "CustomerCategory":
                result = new CustomerCategory({semanticId: ""});
                break;

            case prefix + "QuantitativeValue":
                result = new QuantitativeValue({});
                break;
            
            case prefix + "AllergenCharacteristic":
                result = new AllergenCharacteristic({});
                break;

            case prefix + "NutrientCharacteristic":
                result = new NutrientCharacteristic({});
                break;
            
            case prefix + "PhysicalCharacteristic":
                result = new PhysicalCharacteristic({});
                break;

            case prefix + "SuppliedProduct":
                result = new SuppliedProduct({semanticId: ""});
                break;
            
            case prefix + "Price":
                result = new Price({});
                break;

            case prefix + "Catalog":
                result = new Catalog({semanticId: ""});
                break;

            case prefix + "CatalogItem":
                result = new CatalogItem({semanticId: ""});
                break;
            
            case prefix + "Offer":
                result = new Offer({semanticId: ""});
                break;

            case prefix + "Order":
                result = new Order({semanticId: ""});
                break;

            case prefix + "OrderLine":
                result = new OrderLine({semanticId: ""});
                break;

            case prefix + "SaleSession":
                result = new SaleSession({semanticId: ""});
                break;

            case "http://www.w3.org/2004/02/skos/core#Concept":
                result = new SKOSConcept({});
                break;
        
            default:
                break;
        }

        if (!result)
            throw new Error;

        return result;
    }

    public createFromRdfDataset(dataset: DatasetExt): Semanticable {
        const rdfType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
        const type = Array.from(dataset.filter((quad) => quad.predicate.value === rdfType))[0].object.value;
        const semanticObject: Semanticable = this.createFromType(type);
        semanticObject.setSemanticPropertyAllFromRdfDataset(dataset);
        return semanticObject;
    }
    
}