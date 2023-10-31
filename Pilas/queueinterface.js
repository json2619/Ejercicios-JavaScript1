"use strict";
/* Page functions
Funciones que están conectadas con la página, y por tanto son dependientes de sus elementos.
Estas funciones utilizan las funciones de la cola como clientes.
*/

//Constantes con los elementos de la página
const addButton = document.getElementById("add-button");
const pollButton = document.getElementById("poll-button");
const errorDiv = document.getElementById("error");
const queueDiv = document.getElementById("queue");
const num = document.getElementById("num");

//Manejadores de eventos
addButton.addEventListener("click", addNumber);
pollButton.addEventListener("click", pollNumber);
num.addEventListener("focus", cleanData);

//Cola global para ser usada en la página
const NUMBERS_QUEUE = create();

//Limpia el formulario.
function cleanData() {
	document.getElementById("num").value = "";
}

//Recoge un valor del formulario y lo añade a la cola
function addNumber(){
	errorDiv.innerHTML = "";
	try {
		// .value es un string
		add(NUMBERS_QUEUE, Number.parseInt(num.value));
		queueDiv.innerHTML = toString(NUMBERS_QUEUE);
	} catch (err) {
		errorDiv.innerHTML = err;
	}
}

//Consume un valor de la cola
function pollNumber (){
	errorDiv.innerHTML = "";
	try {
		poll(NUMBERS_QUEUE);
		queueDiv.innerHTML = toString(NUMBERS_QUEUE);
	} catch (err) {
		errorDiv.innerHTML = err;
	}
}

