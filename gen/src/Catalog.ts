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

import Catalogable from "./Catalogable.js"
import ICatalog from "./ICatalog.js"
import ICatalogItem from "./ICatalogItem.js"
import IEnterprise from "./IEnterprise.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class Catalog extends SemanticObject implements ICatalog {

	public constructor(parameters: {semanticId: string, items?: (ICatalogItem & Semanticable)[]});
	public constructor(parameters: {other: Semanticable, items?: (ICatalogItem & Semanticable)[]});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, items?: (ICatalogItem & Semanticable)[]}) {
		super(parameters.semanticId, "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Catalog", parameters.other);
		connector.store(this);
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		if (parameters.items) parameters.items.forEach(e => this.addItem(e));
	}

	public addItem(item: (Catalogable & Semanticable)): void {
		connector.store(item);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lists", item);
	}
	

	public removeItem(item: (Catalogable & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getItems(options?: IGetterOptions): Promise<Array<(Catalogable & Semanticable)>>
	 {
		const results = new Array<(Catalogable & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lists");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(Catalogable & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public async getMaintainers(options?: IGetterOptions): Promise<Array<(IEnterprise & Semanticable)>>
	 {
		const results = new Array<(IEnterprise & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#maintainedBy");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(IEnterprise & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public addMaintainer(maintainer: (IEnterprise & Semanticable)): void {
		connector.store(maintainer);
		this.addSemanticPropertyReference("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#maintainedBy", maintainer);
	}
	

}
