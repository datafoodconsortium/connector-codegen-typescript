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

import Identifiable from "./Identifiable.js"
import Localizable from "./Localizable.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default abstract class Agent extends SemanticObject implements Identifiable {

	protected constructor(parameters: {semanticId?: string, semanticType?: string, other?: Semanticable, localizations?: (Localizable & Semanticable)[]}) {
		super(parameters.semanticId, parameters.other? parameters.other.getSemanticType(): parameters.semanticType, parameters.other);
		connector.store(this);
		
		if (parameters.localizations) parameters.localizations.forEach(e => this.addLocalization(e));
	}

	public removeLocalization(localization: (Localizable & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public addLocalization(localization: (Localizable & Semanticable)): void {
		connector.store(localization);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAddress", localization);
	}
	

	public async getLocalizations(options?: IGetterOptions): Promise<Array<(Localizable & Semanticable)>>
	 {
		const results = new Array<(Localizable & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#hasAddress");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(Localizable & Semanticable)> semanticObject);
		}
		return results;
	}
	

}
