"use strict";

// Expresión regular para el formato de matrícula provincial numérico
const provinciaNumericoRegex = /^[A-Z]{1,2}-\d{1,6}$/;

// Expresión regular para el formato de matrícula provincial alfanumérico
const provinciaAlfanumericoRegex = /^[A-Z]{1,2}-\d{4}-[A-Z]{1,2}$/;

// Expresión regular para el formato de matrícula nacional
const nacionalRegex = /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/;

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

function order(list) {
    list.sort(function (a, b) {
        return b.date - a.date
    });
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
        order(list);
        return list.length;
    }
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
    let position = -1;
    if (!("license" in elem)) throw "El elemento, no es un Vehicle";
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

function testList() {
    // Crear una lista de vehículos
    const vehicleList = create();

    // Agregar vehículos
    const vehicle1 = {
        license: 'M-12345',
        brand: 'Ferrari',
        model: 'Spider 488',
        color: 'rojo',
        date: new Date(2023, 6, 1),
        price: 600000
    };

    const vehicle2 = {
        license: '1234BBC',
        brand: 'Lamborghini',
        model: 'Aventador',
        color: 'azul',
        date: new Date(2023, 2, 1),
        price: 700000
    };

    add(vehicleList, vehicle1);
    add(vehicleList, vehicle2);

    // Verificar funciones
    console.log("La lista está vacía:", isEmpty(vehicleList));
    console.log("Tamaño de la lista:", size(vehicleList));

    console.log("Lista ordenada de vehículos :\n" + toString(vehicleList));

    console.log("Índice de vehicle1:", indexOf(vehicleList, vehicle1));
    console.log("Índice de vehicle2:", indexOf(vehicleList, vehicle2));

    console.log("Último índice de vehicle1:", lastIndexOf(vehicleList, vehicle1));
    console.log("Último índice de vehicle2:", lastIndexOf(vehicleList, vehicle2));

    console.log("Primer vehículo:", firstElement(vehicleList));
    console.log("Último vehículo:", lastElement(vehicleList));

    // Eliminar vehículo en la posición 0
    const removedVehicle = remove(vehicleList, 0);
    console.log("Vehículo eliminado:", removedVehicle);

    // Limpiar la lista
    clear(vehicleList);
    console.log("Lista después de limpiar:\n" + toString(vehicleList));
}
window.onload = testList();