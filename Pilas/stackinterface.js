"use strict";
/* Page functions
Funciones que están conectadas con la página, y por tanto son dependientes de sus elementos.
Estas funciones utilizan las funciones de la pila como clientes.
*/

//Constantes con los elementos de la página
const pushButton = document.getElementById("push-button");
const popButton = document.getElementById("pop-button");
const errorDiv = document.getElementById("error");
const stackDiv = document.getElementById("stack");
const num = document.getElementById("num");

//Manejadores de eventos
pushButton.addEventListener("click", pushNumber);
popButton.addEventListener("click", popNumber);
num.addEventListener("focus", cleanData);

// Pila global para ser usada en la página.
const NUMBERS_STACK = create();

//Limpia el formulario.
function cleanData() {
	document.getElementById("num").value = "";
}

//Recoge un dato del formulario y lo apila.
function pushNumber() {
	errorDiv.innerHTML = "";
	try {
		// .value es un string
		push(NUMBERS_STACK, Number.parseInt(num.value));
		stackDiv.innerHTML = toString(NUMBERS_STACK);
	} catch (err) {
		errorDiv.innerHTML = err;
	}
}

//Función que consume un elemento de la pila
function popNumber() {
	errorDiv.innerHTML = "";
	try {
		pop(NUMBERS_STACK);
		stackDiv.innerHTML = toString(NUMBERS_STACK);
	} catch (err) {
		errorDiv.innerHTML = err;
	}
}

