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
import Agent from "./Agent.js"
import IPerson from "./IPerson.js"
import Localizable from "./Localizable.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import Connector from "./Connector.js"

export default class Person extends Agent implements IPerson {

	public constructor(parameters: {semanticId: string, firstName?: string, lastName?: string, localizations?: (Localizable & Semanticable)[]});
	public constructor(parameters: {other: Semanticable, firstName?: string, lastName?: string, localizations?: (Localizable & Semanticable)[]});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, firstName?: string, lastName?: string, localizations?: (Localizable & Semanticable)[]}) {
		super({semanticId: parameters.semanticId, semanticType: "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Person", other: parameters.other, localizations: parameters.localizations});
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.firstName) this.setFirstName(parameters.firstName);
		if (parameters.lastName) this.setLastName(parameters.lastName);
	}

	public setLastName(lastName: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#familyName", lastName);
	}
	

	public getLastName(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#familyName");
	}
	

	public setFirstName(firstName: string): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#firstName", firstName);
	}
	

	public getFirstName(): string
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#firstName");
	}
	
	public leaveAffiliatedOrganization(organization: (Onboardable & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getAffiliatedOrganizations(): Promise<Array<(Onboardable & Semanticable)>>
	 {
		const results = new Array<(Onboardable & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#affiliates");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(Onboardable & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public affiliateTo(organization: (Onboardable & Semanticable)): void {
		Connector.getInstance().store(organization);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#affiliates", organization);
	}
	

}
