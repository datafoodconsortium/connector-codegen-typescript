/*
 * MIT License
 * 
 * Copyright (c) 2023 Maxime Lecoq <maxime@lecoqlibre.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

import Localizable from "./Localizable.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import Connector from "./Connector.js";

export default class Address extends SemanticObject implements Localizable {

	public constructor(parameters: {semanticId: string, street?: string, postalCode?: string, city?: string, country?: string});
	public constructor(parameters: {other: Semanticable, street?: string, postalCode?: string, city?: string, country?: string});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, street?: string, postalCode?: string, city?: string, country?: string}) {
		super(parameters.semanticId, "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Address", parameters.other);
		Connector.getInstance().store(this);
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.street) this.setStreet(parameters.street);
		if (parameters.postalCode) this.setPostalCode(parameters.postalCode);
		if (parameters.city) this.setCity(parameters.city);
		if (parameters.country) this.setCountry(parameters.country);
	}

	public getConnector(): Connector {
		return Connector.getInstance();
	}

	public getCity(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCity");
	}
	

	public getStreet(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasStreet");
	}
	

	public getPostalCode(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPostalCode");
	}
	

	public setStreet(street: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasStreet", street);
	}
	

	public setCountry(country: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCountry", country);
	}
	

	public setCity(city: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCity", city);
	}
	

	public getCountry(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasCountry");
	}
	

	public setPostalCode(postalCode: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasPostalCode", postalCode);
	}
	

}
