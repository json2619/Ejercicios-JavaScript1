const sym1 = Symbol();
const sym2 = Symbol("Texto 1");
const sym3 = Symbol("Texto 2");

console.log(sym1.toString());
console.log(sym2.description);
console.log(typeof sym2);
console.log(sym1 === sym2);
