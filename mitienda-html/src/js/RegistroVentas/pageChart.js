
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
