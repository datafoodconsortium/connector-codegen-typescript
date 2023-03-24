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

import ICatalog from "./ICatalog.js"
import IEnterprise from "./IEnterprise.js"
import Catalogable from "./Catalogable.js"
import ICatalogItem from "./ICatalogItem.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import IConnector from "./IConnector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class Catalog extends SemanticObject implements ICatalog {
	
	protected connector: IConnector;

	public constructor(parameters: {connector: IConnector, doNotStore?: boolean, semanticId?: string, other?: Semanticable, maintainers?: (IEnterprise & Semanticable)[], items?: (ICatalogItem & Semanticable)[]}) {
		const type: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Catalog";
		
		if (parameters.other) {
			super({ semanticId: parameters.semanticId!, other: parameters.other });
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ semanticId: parameters.semanticId!, semanticType: type });
		
		this.connector = parameters.connector;
		
		
		if (!parameters.doNotStore)
			this.connector.store(this);
		if (parameters.maintainers) parameters.maintainers.forEach(e => this.addMaintainer(e));
		if (parameters.items) parameters.items.forEach(e => this.addItem(e));
	}

	public addMaintainer(maintainer: (IEnterprise & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#maintainedBy";
		if (maintainer.isSemanticObjectAnonymous()) {
			if (maintainer.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, maintainer);
			else this.addSemanticPropertyReference(property, maintainer);
		}
		else {
			this.connector.store(maintainer);
			this.addSemanticPropertyReference(property, maintainer);
		}
	}
	

	public async getItems(options?: IGetterOptions): Promise<Array<(Catalogable & Semanticable)>>
	 {
		const results = new Array<(Catalogable & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lists");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(Catalogable & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public removeItem(item: (Catalogable & Semanticable)): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getMaintainers(options?: IGetterOptions): Promise<Array<(IEnterprise & Semanticable)>>
	 {
		const results = new Array<(IEnterprise & Semanticable)>();
		const properties = this.getSemanticPropertyAll("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#maintainedBy");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<(IEnterprise & Semanticable)> semanticObject);
		}
		return results;
	}
	

	public addItem(item: (Catalogable & Semanticable)): void {
		const property: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#lists";
		if (item.isSemanticObjectAnonymous()) {
			if (item.hasSemanticPropertiesOtherThanType()) this.addSemanticPropertyAnonymous(property, item);
			else this.addSemanticPropertyReference(property, item);
		}
		else {
			this.connector.store(item);
			this.addSemanticPropertyReference(property, item);
		}
	}
	

}
