"use strict";

// Expresión regular para el formato de matrícula provincial numérico
let provinciaNumericoRegex = /^[A-Z]{1,2}-\d{1,6}$/g;

// Expresión regular para el formato de matrícula provincial alfanumérico
let provinciaAlfanumericoRegex = /^[A-Z]{1,2}-\d{4}-[A-Z]{1,2}$/g;

// Expresión regular para el formato de matrícula nacional
let nacionalRegex = /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/g;

function validateLicense(elem) {
    if (
        provinciaNumericoRegex.test(elem.license) ||
        provinciaAlfanumericoRegex.test(elem.license) ||
        nacionalRegex.test(elem.license)
    ) {
        return true;
    } else {
        throw "La matrícula no cumple con ninguno de los formatos admitidos.";
    }
}

const MAX_ELEM_LIST = 5;

function create() {
    return [];
}

function isEmpty(list) {
    return (list.length === 0);
}


function isFull(list) {
    return (list.length === MAX_ELEM_LIST);
}


function size(list) {
    return list.length;
}


function add(list, elem) {
    if (!("license" in elem)) throw "El elemento, no tiene la propiedad license";
    if (isFull(list)) throw "La lista está llena";
    if (validateLicense(elem)) {
        list.push(elem);
        return size(list);
    }
}

function addAt(list, elem, index) {
    if (!("license" in elem)) throw "El elemento, no es un Vehicle";
    if (isFull(list)) throw "La lista está llena";
    if (!(index >= 0 && index < MAX_ELEM_LIST)) throw "El índice está fuera de los límites de la lista";

    list.splice(index, 0, elem);
    return size(list);
}

function get(list, index) {
    if (!(index >= 0 && index < MAX_ELEM_LIST)) throw "El índice está fuera de los límites de la lista";
    return list[index];
}

function toString(list) {
    let result = "";
    for (let i = 0; i < list.length; i++) {
        let vehicle = list[i];
        for (let property in vehicle) {
            if (vehicle.hasOwnProperty(property)) {
                result += `${vehicle[property]}` + " ";
            }
        }
        result += "\n";
    }
    return result;
}

function indexOf(list, elem) {
    if (!("license" in elem)) throw "El elemento, no es un Vehicle";

    return list.findIndex(vehiculo => vehiculo.license === elem.license);
}

function lastIndexOf(list, elem) {
    if (!("license" in elem)) throw "El elemento, no es un Vehicle";
    let position = -1;

    for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].license === elem.license) {
            position = i;
        }
    }

    return position;
}

function capacity(list) {
    return MAX_ELEM_LIST;
}

function clear(list) {
    list.splice(0, list.length);
}


function firstElement(list) {
    if (isEmpty(list)) throw "La lista está vacía";
    return list[0];
}

function lastElement(list) {
    if (isEmpty(list)) throw "La lista está vacía";
    return list[list.length - 1];
}

function remove(list, index) {
    if (!(index >= 0 && index < MAX_ELEM_LIST)) throw "El índice está fuera de los límites de la lista";
    return list.splice(index, 1)[0];
}

function removeElem(list, elem) {
    if (!("license" in elem)) throw "El elemento, no es un Vehicle";

    let found = indexOf(list, elem);

    if (found !== -1) {
        list.splice(found, 1);
        return true;
    } else {
        return false;
    }
}

function set(list, elem, index) {
    if (!("license" in elem)) throw "El elemento, no es un Vehicle";
    if (!(index >= 0 && index < MAX_ELEM_LIST)) throw "El índice está fuera de los límites de la lista";

    let elemAnterior = list[index];
    list[index] = elem;
    return elemAnterior;

}

function testList() {
    // Crear una lista de vehículos
    let vehicleList = create();

    // Agregar vehículos
    let vehicle1 = {
        license: 'M-12345',
        brand: 'Ferrari',
        model: 'Spider 488',
        color: 'rojo',
        date: new Date(2023, 1, 1),
        price: 600000
    };

    let vehicle2 = {
        license: 'M-9999-ZZ',
        brand: 'Lamborghini',
        model: 'Aventador',
        color: 'azul',
        date: new Date(2023, 2, 1),
        price: 700000
    };

    let vehicle3 = {
        license: '1234ACD',
        brand: 'Lamborghini',
        model: 'Aventador',
        color: 'azul',
        date: new Date(2023, 2, 1),
        price: 900000
    };
    // El vehículo 3 no cumple con los requisitos de formato.
    add(vehicleList, vehicle3);
    add(vehicleList, vehicle2);
    addAt(vehicleList, vehicle1, 1);

    // Verificar funciones
    console.log("La lista está vacía:", isEmpty(vehicleList));
    console.log("Tamaño de la lista:", size(vehicleList));

    console.log("Lista de vehículos:\n" + toString(vehicleList));

    console.log("Índice de vehicle1:", indexOf(vehicleList, vehicle1));
    console.log("Índice de vehicle2:", indexOf(vehicleList, vehicle2));

    console.log("Último índice de vehicle1:", lastIndexOf(vehicleList, vehicle1));
    console.log("Último índice de vehicle2:", lastIndexOf(vehicleList, vehicle2));

    console.log("Primer vehículo:", firstElement(vehicleList));
    console.log("Último vehículo:", lastElement(vehicleList));

    // Eliminar vehículo en la posición 0
    console.log(remove(vehicleList, 0));

    // Establecer un nuevo vehículo en la posición 0
    let newVehicle = {
        license: 'X-54321',
        brand: 'Porsche',
        model: '911',
        color: 'negro',
        date: new Date(2023, 3, 1),
        price: 80000
    };

    // Limpiar la lista
    clear(vehicleList);
    console.log("Lista después de limpiar:\n" + toString(vehicleList));
}
window.onload = testList();