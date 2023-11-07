
let numbers = [32, -5, 66, 32, 23, 14, 32, 16];
let numbers2 = [32, -5, 66, 32, 23, 14, 32, 16];
console.log(numbers.indexOf(66));
console.log(numbers.lastIndexOf(32)); //Devuelve el índice del ultimo elemento que coincida

numbers.splice(2, 0, 'a', 'b', 'c');
console.log(numbers);

numbers2.splice(2, 3, 'a', 'b', 'c');
console.log(numbers2);

let computers = [
    {
        computerID: 134,
        brand: 'HP',
        model: 'EliteBook',
        memory: 16,
    },
    {
        computerID: 14,
        brand: 'HP',
        model: 'EliteBook',
        memory: 32,
    },
    {
        computerID: 456,
        brand: 'HP',
        model: 'Pavilion',
        memory: 16,
    },
];

let c = computers[2];
c = {
    computerID: 134,
    brand: 'HP',
    model: 'EliteBook',
    memory: 16,
};
console.log(computers.indexOf(c));

function search(array) {

    for (let index = 0; index < array.length; index++) {

        if (array[index].memory > 16) return array[index]
    }
    return null;
}

console.log(search(computers));

console.log("----------------");

console.log(computers.find(function (elem) {
    return elem.memory > 16 ? true : false;
}));

console.log(computers);

console.log("----------------");

console.log(computers.findIndex(function (elem) {
    return elem.memory > 16 ? true : false;
}));

console.log(computers);

console.log("----------------");

let ids = [];

console.log(computers.forEach(function (elem, index, array) {
    if (elem.memory === 16) {
        ids.push(elem.computerID);
    }
}));

console.log(ids);

console.log("----------------");

function changeMemory(elem, index, array) {
    if (elem.memory === this.memory) {
        this.ids2.push(elem.computerID);
        elem.model = this.model;
        array[index].memory *= 2;
    }
}

function update(memory, computers) {
    let ids2 = [];
    computers.forEach(changeMemory, {
        ids2: ids2,
        memory: memory,
        model: 'AAAAAAA',
    })
    return ids2;
}

// console.log(update(16, computers));
console.log(computers);

console.log("----------------");

numbers.forEach(function (elem, index, array) {
    let i = Number.parseInt(elem);
    if (Number.isNaN(i)) {
        array[index] = Number.NaN;
    }
});
console.log(numbers);

console.log("----------------");

let ids3 = computers.map(function (elem, index) {
    return {
        id: elem.computerID,
        index: index,
    }
})

console.log(ids3);

console.log("----------------");

let ids4 = computers.filter(function (elem, index) {
    return (elem.memory <= 16) ? true : false;
})

console.log(ids4);

console.log("----------------");

numbers.push(0);
numbers.push(141);

/* Comparación de Burbuja
for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 1; j < numbers.length; j++) {
        if (numbers[i] < numbers[j]) {
            let tmp = numbers[i];
            numbers[i] = numbers[j];
            numbers[j] = temp;
        }

    }

}
*/

console.log(numbers.sort(function (elemA, elemB) {
    return elemA - elemB;
}));

console.log(computers.sort(function (elemA, elemB) {
    return elemA.computerID - elemB.computerID;
}));

console.log(computers.sort(function (elemA, elemB) {
    return elemA.model.localeCompare(elemB.model);
}));

function isOlderLegalAge(user) {
    let today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return (user.birth < today);
}

function everyAndSomeElements() {
    cleanMessage();
    let users = [
        { username: "user1", birth: new Date(1999, 7, 3) },
        { username: "user2", birth: new Date(1998, 2, 23) },
        { username: "user3", birth: new Date(2010, 6, 19) },
        { username: "user4", birth: new Date(1995, 10, 12) }
    ];
    console.log(users.every(isOlderLegalAge));
    console.log(users.some(isOlderLegalAge));
}

const mySet = new Set();
mySet.add(1);
mySet.add(5);
mySet.add('texto');
let o = {
    a: 1,
    b: 2,
};
mySet.add(o);

console.log(mySet.size);
console.log(mySet.has(1));
console.log(mySet.has(o));
console.log(mySet.has("TEXTO".toLocaleLowerCase()));

mySet.delete(1);
console.log(mySet.size);
console.log(mySet.delete(11111111));

mySet.add(4).add(5).add(6);
console.log(mySet.size);
console.log(mySet.add(7).delete(5));

for (let item of mySet) {
    console.log(item);
}

mySet.forEach(function (item) {
    if (item instanceof Object) item.pepito = 'nuevo pepito';
    console.log(item);
});

const myMap = new Map();
let obj = {};
let f = function () { };
let str = "text";

myMap.set(obj, "Valor del objeto");
myMap.set(f, "Valor del objeto");
myMap.set(str, "Valor del objeto");

console.log(myMap.get(obj));
console.log(myMap.get(f));
console.log(myMap.get(str));

console.log(myMap.size);
myMap.delete(f);
console.log(myMap.size);

myMap.set(obj, "Nuevo valor");
console.log(myMap.size);

for (let [key, value] of myMap) {
    console.log("CLave: " + key + " Valor: " + value);
}

for (const value of myMap.values()) {
    console.log("Valor: " + value);
}

myMap.forEach(function (value, key, m) {
    console.log("CLave: " + key + " Valor: " + value);
});

let visitedSet = new WeakSet();
let john = { name: "John" };
let pete = { name: "Pete" };
visitedSet.add(john);
visitedSet.add(pete);

{
    let mary = { name: "Mary" };
    visitedSet.add(mary);
    console.log(visitedSet.has(mary));
    console.log(mary);
}

function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}

let visitsCountMap = new WeakMap();
{
    let john = { name: "John" };
    countUser(john);
    countUser(john);
    countUser(john);
    console.log(visitsCountMap.get(john));
}

function process(obj) {
    if (!cache.has(obj)) {
        let result = 0;
        for (let i = 1; i < 64; i++) result = result + 2 ** i;
        cache.set(obj, result);
    }
    return cache.get(obj);
}


let cache = new WeakMap();
let obj1 = {

}

console.log(process(obj));
console.log(process(obj));

const sym1 = Symbol();
const sym2 = Symbol("Texto 1");
const sym3 = Symbol("Texto 2");

console.log(sym1.toString());
console.log(sym2.description);
console.log(typeof sym2);
console.log(sym1 === sym2);

let computer = computers[0];
console.log(computer);

const id = Symbol("codSerie");
computer[id] = 123456;

console.log(computer);

for (const p in computer) {
    console.log(computer[p]);
}

console.log(computers);

const library1 = Symbol('lib1.id');
const library2 = Symbol('lib2.id');

function lib1tag(obj, id) {
    obj[library1] = id;
}

function lib2tag(obj, id) {
    obj[library2] = id;
}

const c1 = {
    brand: 'hp',
    model: 'EliteBook',
    memory: 16
}

lib1tag(c1, "1234");
lib2tag(c1, "1234");

console.log(c1);

function test1() {
    let s = Symbol.for('lib1.id');

    c1[s] = "zzzzz";
}

test1();

function test2() {
    return c1[Symbol.for('lib1.id')];
}

console.log(test2());

console.log(c1);