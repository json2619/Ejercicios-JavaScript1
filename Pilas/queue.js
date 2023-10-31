"use strict";
/* queue Functions
Estás funciones son independientes de la página y por lo tanto reutilizables.
*/
const MAX_ELEM_QUEUE = 5; //Constante con la capacidad máxima de la cola.

//Permite crear una cola
function create() {
	//No hay que instanciar los elementos del array
	return [];
}

//Es la cola vacía
function isEmpty(queue) {
	return (queue.length === 0);
}

//Está la cola completa
function isFull(queue) {
	return (queue.length === MAX_ELEM_QUEUE);
}

//Tamaño de la cola
function size(queue) {
	return queue.length;
}

//Añadimos un nuevo elemento a la cola
function add(queue, elem) {
	elem = Number.parseInt(elem);
	if (Number.isNaN(elem)) { //Si el elemento no es un entero lanzamos excepción
		throw "The element is not a number";
	}
	if (!isFull(queue)) { //Añadimos si la cola no está completa
		queue.push(elem); //Utilizamos los métodos de array para gestionar la cola
	} else { //Si está completa lanzamos excepción
		throw "The queue is Full. You can't put the element in it";
	}
	return size(queue); //Devolvemos el tamaño
}

//Consumimos el elmento de la cola
function poll(queue) {
	if (isEmpty(queue)) throw "The queue is empty";
	return queue.shift();
}

//Consultamos el último elemento de la cola
function peek(queue) {
	if (isEmpty(queue)) throw "The queue is empty";
	return queue[queue.length-1];
}

//Transformamos la cola en String
function toString(queue) {
	// Reducimos el array para el primer elemento en salir.
	return queue.reduce(function(str, item, index){
		//Generamos guiones mientras no sea la última posición.
		return (index !== 0)? str + " - " + item : str + item;
	},""); //El valor inicial de la reducción es ""
}

//Buscamos un elemento en la cola
function search(queue, elem) {
	elem = Number.parseInt(elem);
	if (Number.isNaN(elem)) throw "The element is not a integer.";
	if (isEmpty(queue)) throw "The queue is empty";

	//indexOf nos serviría para primitivos, no para objetos.
	//return queue.indexOf(elem);
	//Ejecutamos findIndex para personalizar búsqueda.
	return queue.findIndex(function (item){
		return item === elem;
	});
}

//Devolvemos la capacidad de la cola
function capacity(queue) {
	return MAX_ELEM_QUEUE;
}

//Limpiamos de elementos la cola
function clear(queue) {
	queue.splice(0, queue.length);
	//queue.length = 0; //También funciona este método.
}

//Obtenemos el primer elemento de la cola
function firstElement(queue) {
	if (isEmpty(queue)) throw "The queue is empty";
	return queue[0];
}

//Obtenemos el último elemento de la cola
function lastElement(queue) {
	if (isEmpty(queue)) throw "The queue is empty";
	return queue[queue.length-1];
}

//Función de testeo del resto de funciones
function testQueue() {
	let queue = create();
	console.log("Capacidad: " + capacity(queue));
	console.log("Es vacía: " + isEmpty(queue));
	console.log("Longitud: " + size(queue));

	try {
		for (let i = 0; i < MAX_ELEM_QUEUE; i++) {
			console.log("Nº de elementos: " + add(queue, i * 10));
		}
		add(queue, i); //Genera una excepción
	} catch (err) {
		console.log(err);
	}

	console.log("The full queue: " + toString(queue));
	console.log("The first element queue: " + firstElement(queue));
	console.log("The last element queue: " + lastElement(queue));

	console.log("is 40 in queue: " + search(queue, 40));
	console.log("is -40 in queue: " + search(queue, -40));
	//clear(queue);

	try {
		while (true) {
			console.log("Unnonsumed Element: " + peek(queue));
			console.log("Consumed Element: " + poll(queue));
			console.log("The queue: " + toString(queue));
		}
	} catch (err) {
		//Cuando la cola está vacía, se genera una excepción que capturamos pero no tratamos.
	}

	console.log("The queue: " + toString(queue));
}
window.onload = testQueue;
