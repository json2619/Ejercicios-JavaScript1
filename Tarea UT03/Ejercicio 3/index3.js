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

function isEmpty(set) {
    return set.length === 0;
}

function size(set) {
    return set.length;
}

function add(set, elem) {
    if (!("license" in elem)) throw "El elemento no tiene la propiedad license.";
    if (validateLicense(elem)) {
        let booExists = set.some(vehicle => vehicle.license === elem.license);
        if (!booExists) {
            set.push(elem);
            return set.length;
        } else {
            throw "La matrícula ya está en el conjunto.";
        }
    }
}

function has(set, elem) {
    if (!("license" in elem)) throw "El elemento no tiene la propiedad license.";

    return set.some(vehicle => vehicle.license === elem.license);

}

function toString(set) {
    let result = "";
    for (let i = 0; i < set.length; i++) {
        let vehicle = set[i];
        for (let property in vehicle) {
            if (vehicle.hasOwnProperty(property)) {
                result += `${vehicle[property]}` + " ";
            }
        }
        result += "\n";
    }
    return result;
}

function clear(set) {
    set.length = 0;
}

function remove(set, elem) {
    if (!("license" in elem)) throw "El elemento no tiene la propiedad license.";

    let index = set.findIndex(vehicle => vehicle.license === elem.license);

    if (index !== -1) {
        set.splice(index, 1);
        return true;
    }

    return false;
}

function testList() {
    // Crear un conjunto de vehículos
    const vehicleSet = create();

    // Agregar vehículos
    const vehicle1 = {
        license: 'M-12345',
        brand: 'Ferrari',
        model: 'Spider 488',
        color: 'rojo',
        date: new Date(2023, 1, 1),
        price: 600000
    };

    const vehicle2 = {
        license: '1234ABC',
        brand: 'Lamborghini',
        model: 'Aventador',
        color: 'azul',
        date: new Date(2023, 2, 1),
        price: 700000
    };

    add(vehicleSet, vehicle1);

    //El vehicle 2, no tiene un formato adecuado de matrícula
    add(vehicleSet, vehicle2);

    // Verificar funciones
    console.log("El conjunto está vacío:", isEmpty(vehicleSet));
    console.log("Tamaño del conjunto:", size(vehicleSet));

    console.log("Conjunto de vehículos:\n" + toString(vehicleSet));

    console.log("¿El vehículo 1 está en el conjunto?", has(vehicleSet, vehicle1));
    console.log("¿El vehículo 2 está en el conjunto?", has(vehicleSet, vehicle2));

    // Eliminar vehículo 1 del conjunto
    const removedVehicle1 = remove(vehicleSet, vehicle1);
    console.log("¿Se eliminó el vehículo 1 del conjunto?", removedVehicle1);

    // Limpiar el conjunto
    clear(vehicleSet);
    console.log("Conjunto después de limpiar:\n" + toString(vehicleSet));
}
window.onload = testList();