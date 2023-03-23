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

import Onboardable from "./Onboardable.js"
import IPerson from "./IPerson.js"
import Agent from "./Agent.js"
import Localizable from "./Localizable.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import IConnector from "./IConnector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class Person extends Agent implements IPerson {
	

	public constructor(parameters: {connector: IConnector, doNotStore?: boolean, semanticId?: string, other?: Semanticable, firstName?: string, lastName?: string, localizations?: (Localizable & Semanticable)[]}) {
		const type: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Person";
		
		if (parameters.other) {
			super({ connector: parameters.connector, semanticId: parameters.semanticId!, other: parameters.other });
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ connector: parameters.connector, semanticId: parameters.semanticId!, semanticType: type, localizations: parameters.localizations });
		
		
		
		
		if (!parameters.doNotStore)
			this.connector.store(this);
		if (parameters.firstName) this.setFirstName(parameters.firstName);
		if (parameters.lastName) this.setLastName(parameters.lastName);
	}

	public setLastName(lastName: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#familyName";
		this.setSemanticPropertyLiteral(property, lastName);
	}
	

	public getLastName(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#familyName");
	}
	

	public setFirstName(firstName: string): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#firstName";
		this.setSemanticPropertyLiteral(property, firstName);
	}
	

	public getFirstName(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#firstName");
	}
	
	public leaveAffiliatedOrganization(organization: (Onboardable & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getAffiliatedOrganizations(options?: IGetterOptions): Promise<Array<(Onboardable & Semanticable)>>
	 {
		const results = new Array<(Onboardable & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#affiliates");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(Onboardable & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public affiliateTo(organization: (Onboardable & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#affiliates";
		if (organization.isSemanticObjectAnonymous()) {
			if (organization.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, organization);
			else this.addSemanticPropertyReference(property, organization);
		}
		else {
			this.connector.store(organization);
			this.addSemanticPropertyReference(property, organization);
		}
	}
	

}
