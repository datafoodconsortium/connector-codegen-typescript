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

import DefinedProduct from "./DefinedProduct.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import connector from "./Connector.js"

export default class SuppliedProduct extends DefinedProduct {

	public constructor(parameters: {semanticId: string, name?: string, description?: string});
	public constructor(parameters: {other: Semanticable, name?: string, description?: string});
	public constructor(parameters: {semanticId?: string, other?: Semanticable, name?: string, description?: string}) {
		super({semanticId: parameters.semanticId, semanticType: "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#SuppliedProduct", other: parameters.other, name: parameters.name, description: parameters.description});
		
		if (parameters.other && this.isSemanticSameTypeOf(parameters.other)) throw new Error();
		
	}

	public getTotalTheoreticalStock(): number
	 {
		return this.getSemanticProperty("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#totalTheoreticalStock");
	}
	

	public setTotalTheoreticalStock(totalTheoreticalStock: number): void {
		
		this.setSemanticPropertyLiteral("http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#totalTheoreticalStock", totalTheoreticalStock);
	}
	


}
