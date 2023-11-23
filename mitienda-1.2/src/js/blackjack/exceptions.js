function BaseException(message = "Default Message", fileName,
	lineNumber) {
	let instance = new Error(message, fileName, lineNumber);
	instance.name = "MyError";
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if (Error.captureStackTrace) {
		Error.captureStackTrace(instance, BaseException);
	}
	return instance;
}

BaseException.prototype = Object.create(Error.prototype, {
	constructor: {
		value: BaseException,
		enumerable: false,
		writable: true,
		configurable: true
	}
});

//Excepción acceso inválido a constructor
function InvalidAccessConstructorException() {
	let instance = BaseException.call(this, "Constructor can’t be called as a function.");
	instance.name = "InvalidAccessConstructorException";
	return instance;
}
InvalidAccessConstructorException.prototype = Object.create(BaseException.prototype);
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

//Excepción personalizada para indicar valores vacios.
function EmptyValueException(param) {
	let instance = BaseException.call(this, "Error: The parameter " + param
		+ " can't be empty.");
	instance.name = "EmptyValueException";
	instance.param = param;
	return instance;
}
EmptyValueException.prototype = Object.create(BaseException.prototype);
EmptyValueException.prototype.constructor = EmptyValueException;

//Excepción de valor inválido
function InvalidValueException(param, value) {
	let instance = BaseException.call(this, "Error: The paramenter " + param
		+ " has an invalid value. (" + param + ": " + value + ")");
	instance.name = "InvalidValueException";
	instance.param = param;
	instance.param = value;
	return instance;
}
InvalidValueException.prototype = Object.create(BaseException.prototype);
InvalidValueException.prototype.constructor = InvalidValueException;

//Excepciones BlackJackException
function BlackJackException(message) {
	message = message || "Error: BlackJack Exception";
	let instance = BaseException.call(this, message);
	instance.name = "BlackJackException";
	return instance;
}
BlackJackException.prototype = Object.create(BaseException.prototype);
BlackJackException.prototype.constructor = BlackJackException;
function NullCardException() {
	let instance = BlackJackException.call(this, "Error: Card Argument is null or invalid.");
	instance.name = "NullCardException";
	return instance;
}
NullCardException.prototype = Object.create(BlackJackException.prototype);
NullCardException.prototype.constructor = NullCardException;

function Upper21Exception() {
	let instance = BlackJackException.call(this, "The score is upper 21.");
	instance.name = "Upper21Exception";
	return instance;
}
Upper21Exception.prototype = Object.create(BlackJackException.prototype);
Upper21Exception.prototype.constructor = Upper21Exception;
