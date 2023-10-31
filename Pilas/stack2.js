const MAX_ELEM_STACK = 5;

function create() {
    return [];
}

function isEmpty(stack) {
    return (stack.length === 0);
}

function isFull(stack) {
    return (stack.length === MAX_ELEM_STACK);
}

function size(stack) {
    return stack.length;
}

function push(stack, elem) {
    if (isFull(stack)) throw "The stack is full";
    if (typeof elem !== "number") throw "the element is not a number";
    stack.push(elem);
    return size(stack);
}

function pop(stack) {
    if (isEmpty(stack)) throw "The stack is empty";
    return stack.pop();
}

//Consulto el último elemento de la pila
function peek(stack) {
    if (isEmpty(stack)) throw "The stack is empty";
    return stack[stack.length - 1];
}

function toString(stack) {
    let str = "";
    for (let index = 0; index < stack.length; index++) {
        str = stack[index] + "-";
    }
}

function testStack() {
    let stack = create();
    console.log(isEmpty(stack));

    try {
        for (let index = 0; index < MAX_ELEM_STACK; index++) {
            push(stack, index);
            console.log(stack);
        }
        push(stack, 12);
    } catch (error) {
        console.log("El elemento no es un String" + error);
    }

    try {
        while (true) {
            pop(stack);
            console.log(stack);
        }
    } catch (error) {
        console.log("La pila está vacía");
    }
}
window.onload = testStack();