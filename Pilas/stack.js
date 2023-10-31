"use strict";
/* stack functions
Estás funciones son independientes de la página y por lo tanto reutilizables.
*/
const MAX_ELEM_STACK = 5; //Constante con la capacidad máxima de la pila.
//Permite crear una pila
function create() {
	//No tenemos que instanciar los elementos.
	return [];
}
//Es la pila vacía
function isEmpty(stack) {
	return (stack.length === 0);
}

//Está completa la pila
function isFull(stack) {
	return (stack.length === MAX_ELEM_STACK);
}

//Tamaño de la pila
function size(stack) {
	return stack.length; //El tamaño de la pila coincide con el tamaño del array
}

//Apila un nuevo elemento en la pila.
function push(stack, elem) {
	elem = Number.parseInt(elem);
	if (Number.isNaN(elem)) { //Lanzamos excepción si el elemnto es NaN
		throw "The element is not a number";
	}
	if (!isFull(stack)) { //Lanzamos excepción si la pila está llena
		stack.push(elem);
	} else {
		throw "The stack is Full. You can't put the element in it";
	}
	return size(stack); //Devolvermo el tamaño.
}

//Función que consume un elemento de la pila
function pop(stack) {
	if (isEmpty(stack)) throw "The stack is empty";
	return stack.pop();
}

//Consulto el último elemento de la pila
function peek(stack) {
	if (isEmpty(stack)) throw "The stack is empty";
	return stack[stack.length-1];
}

//Genera la pila a String
function toString(stack){
	// Reducimos por la derecha el array para empezar por la cima.
	return stack.reduceRight(function(str, item, index){
		//Generamos guiones mientras no sea la última posición.
		return (index !== stack.length - 1)? str + " - " + item : str + item;
	},""); //El valor inicial de la reducción es ""
}

//Busca un elemento en la pila
function search(stack, elem){
	elem = Number.parseInt(elem);
	if (Number.isNaN(elem)) throw "The element is not a integer.";
	if (isEmpty(stack)) throw "The stack is empty";

	//indexOf nos serviría para primitivos, no para objetos.
	//return stack.indexOf(elem);
	//Ejecutamos findIndex para personalizar búsqueda.
	return stack.findIndex(function (item){
		return item === elem;
	});
}

//Capacidad de la pila
function capacity(stack) {
	return MAX_ELEM_STACK;
}

//Limpia la pila
function clear(stack) {
	stack.splice(0, stack.length);
	//stack.length = 0; //También funciona este método.
}

//Primer elemento de la pila
function firstElement(stack) {
	if (isEmpty(stack)) throw "The stack is empty";
	return stack[0];
}

//Último elemento de la pila
function lastElement(stack) {
	if (isEmpty(stack)) throw "The stack is empty";
	return stack[stack.length-1];
}

//Función de testeo del ejercicio
function testStack() {
	let stack = create();
	console.log("Capacidad: " + capacity(stack));
	console.log("Es vacía: " + isEmpty(stack));
	console.log("Longitud: " + size(stack));

	try {
		for (let i = 0; i < MAX_ELEM_STACK; i++) {
			console.log("Nº de elementos: " + push(stack, i * 10));
		}
		push(stack, i); //Genera una excepción.
	} catch (err) {
		console.log(err);
	}

	console.log("The full stack: " + toString(stack));
	console.log("The first element stack: " + firstElement(stack));
	console.log("The last element stack: " + lastElement(stack));

	console.log("is 40 in stack: " + search(stack, 40));
	console.log("is -40 in stack: " + search(stack, -40));
	//clear(stack);

	//Vaciamos la pila mientras tiene elementos.
	try {
		while (true) {
			console.log("Unnonsumed Element: " + peek(stack));
			console.log("Consumed Element: " + pop(stack));
			console.log("The stack: " + toString(stack));
		}
	} catch (err) {
		//Cuando la pila está vacía, se genera una excepción que capturamos pero no tratamos.
	}

	console.log("The stack: " + toString(stack));
}
window.onload = testStack;
