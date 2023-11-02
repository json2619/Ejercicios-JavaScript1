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
    if (isFull(list)) throw "La lista está llena";
    if (!elem.license) throw new Error('El elemento no tiene la propiedad license.');
    list.push(elem);
    return size(list);
}

function addAt(list, elem, index) {
    if (!(elem instanceof vehicle)) throw new Error('El elemento no no es un VEHICLE.');
    list.splice(index, 0, elem);
    return size(list);
}

function get(list, index) {
    return lista[index];
}

function toString(list) {
    let str = "";
    for (let index = 0; index < list.length; index++) {
        str = list[index] + "-";
    }
}

function indexOf(list, elem) {
    return list.indexOf(elem);
}

function lastIndexOf(list, elem) {
    return list.lastIndexOf(elem);
}

function capacity(list) {
    return MAX_ELEM_LIST;
}

function testlist() {
    let vehicle = {
        license: '1234ABC',
        brand: 'Ferrari',
        model: 'Spider 488',
        color: 'red',
        date: new Date(2023, 1, 1),
        price: 600000
    }
}
window.onload = testlist();