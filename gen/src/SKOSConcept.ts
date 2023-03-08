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

import ISKOSConceptScheme from "./ISKOSConceptScheme.js"
import ISKOSConcept from "./ISKOSConcept.js"
import ISKOSLabel from "./ISKOSLabel.js"
import { SemanticObjectAnonymous } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import Connector from "./Connector.js"

export default class SKOSConcept extends SemanticObjectAnonymous implements ISKOSConcept {

	public constructor(parameters: {semanticType: string});
	public constructor(parameters: {other: Semanticable});
	public constructor(parameters: {semanticType?: string, other?: Semanticable}) {
		super(parameters.other? parameters.other.getSemanticType(): parameters.semanticType);
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		
	}

	public removeNarrower(narrower: (ISKOSConcept & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public addNarrower(narrower: (ISKOSConcept & Semanticable)): void {
	}
	

	public async getPrefLabel(): Promise<Array<(ISKOSLabel & Semanticable)>>
	 {
		const results = new Array<(ISKOSLabel & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://www.w3.org/2004/02/skos/core#prefLabel");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(ISKOSLabel & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public addPrefLabel(prefLabel: (ISKOSLabel & Semanticable)): void {
	}
	

	public removeScheme(scheme: (ISKOSConceptScheme & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getScheme(): Promise<Array<(ISKOSConceptScheme & Semanticable)>>
	 {
		const results = new Array<(ISKOSConceptScheme & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://www.w3.org/2004/02/skos/core#inScheme");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(ISKOSConceptScheme & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public addBroader(broader: (ISKOSConcept & Semanticable)): void {
	}
	

	public async getNarrower(): Promise<Array<(ISKOSConcept & Semanticable)>>
	 {
		const results = new Array<(ISKOSConcept & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://www.w3.org/2004/02/skos/core#narrower");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(ISKOSConcept & Semanticable)> semanticObject);
		});
		return results;
	}
	

	public removePrefLabel(prefLabel: (ISKOSLabel & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public removeBroader(broader: (ISKOSConcept & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public addScheme(scheme: (ISKOSConceptScheme & Semanticable)): void {
	}
	

	public async getBroader(): Promise<Array<(ISKOSConcept & Semanticable)>>
	 {
		const results = new Array<(ISKOSConcept & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://www.w3.org/2004/02/skos/core#broader");
		properties.forEach(async p => {
			const semanticObject: Semanticable | undefined = await Connector.getInstance().fetch(p);
			if (semanticObject) results.push(<(ISKOSConcept & Semanticable)> semanticObject);
		});
		return results;
	}
	

}
