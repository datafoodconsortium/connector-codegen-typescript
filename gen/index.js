import { default as Address } from './lib/Address.js'

const a = new Address({semanticId: "test", city: "Putanges"});
console.log(a.getCity());
