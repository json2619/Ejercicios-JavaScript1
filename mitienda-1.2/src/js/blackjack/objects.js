function Card(suit, value) {
	//La función se invoca con el operador new
	if (!(this instanceof Card))
		throw new InvalidAccessConstructorException();

	//Validación de argumentos de entrada
	if (Card.suits.indexOf(suit) === -1)
		throw new InvalidValueException(suit, "suit");
	if (Card.values.indexOf(value) === -1)
		throw new InvalidValueException(value, "value");

	// Definición de propiedades no configurables y de solo lectura.
	Object.defineProperty(this, "suit", {
		value: suit,
		enumerable: true,
		writable: false,
		configurable: false
	});
	Object.defineProperty(this, "value", {
		value: value,
		enumerable: true,
		writable: false,
		configurable: false
	});

	let _score = 0;
	switch (value) {
		case "A":
			_score = 11;
			break;
		case "K": case "Q": case "J":
			_score = 10;
			break;
		default: _score = +value;
	}
	Object.defineProperty(this, "score", {
		value: _score,
		enumerable: true,
		writable: false,
		configurable: false
	});

}
Card.prototype.constructor = Card;
Card.suits = ["Corazón", "Trébol", "Diamante", "Pica"];
Card.values = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
Card.prototype.toString = function () {
	return this.suit + "-" + this.value;
}

function Deck(num = 1) {
	//La función se invoca con el operador new
	if (!(this instanceof Deck))
		throw new InvalidAccessConstructorException();

	// Campos privados
	let _num = num;
	let _deck;

	createDeck();
	shuffleDeck();

	this.getNextCard = function () {
		if (_deck.length <= _limit) {
			_upperLimit = true;
		}
		return _deck.pop();
	};

	this.renewDeck = function () {
		createDeck();
		shuffleDeck();
	};

	this.emptyDeck = function (callback) {
		let index = 0;
		while (_deck.length > 0) {
			callback(this.getNextCard(), ++index, this.upperLimit);
		}
	};

	function createDeck() {
		_deck = [];
		for (let i = 0; i < _num; i++) {
			for (let suitIdx = 0; suitIdx < Card.suits.length; suitIdx++) {
				for (let valueIdx = 0; valueIdx < Card.values.length; valueIdx++) {
					let card = new Card(Card.suits[suitIdx], Card.values[valueIdx]);
					_deck.push(card);
				}
			}
		}
	}

	function shuffleDeck() {
		for (let i = 0; i < _deck.length; i++) {
			let swapIdx = Math.trunc(Math.random() * _deck.length);
			let tmp = _deck[swapIdx];
			_deck[swapIdx] = _deck[i];
			_deck[i] = tmp;
		}
	}

	let _upperLimit = false;
	const _limit = Math.trunc(Card.suits.length * Card.values.length * _num *
		0.2);

	Object.defineProperty(this, 'upperLimit', {
		get() {
			return _upperLimit;
		},
	});

}
Deck.prototype.constructor = Deck;

function TablePlayer(name) {
	//La función se invoca con el operador new
	if (!(this instanceof TablePlayer))
		throw new InvalidAccessConstructorException();
	//Validación de argumentos de entrada
	if (!name) throw new InvalidValueException(name, "name");

	// Campos privados
	const _cards = [];
	let _score = 0;

	this.addCard = function (card) {
		if (!card instanceof Card) throw new NullCardException();
		_cards.push(card);
		_score = this.getScore();
		// Chequeo de puntuación.
		if (this.score > 21) throw new Upper21Exception();
		return _cards.length;
	}

	this.initPlay = function () {
		_cards.length = 0;
	}

	// Propiedades públicas
	Object.defineProperty(this, "name", {
		value: name,
		enumerable: true,
		writable: false,
		configurable: false
	});
	Object.defineProperty(this, "cards", {
		get: function () {
			return _cards;
		}
	});
	Object.defineProperty(this, "score", {
		get: function () {
			return _score;
		}
	});
}

TablePlayer.prototype.constructor = TablePlayer;
TablePlayer.prototype.getScore = function () {
	let score = 0;
	let hasAce = 0;
	for (let i = 0; i < this.cards.length; i++) {
		score += this.cards[i].score;
		if (this.cards[i].value === "A") {
			hasAce++;
		}
	}
	while (hasAce > 0 && score > 21) {
		score -= 10;
		hasAce--;
	}
	return score;
}

TablePlayer.prototype.cardsToString = function () {
	return this.cards.join(";");
}

TablePlayer.prototype.checkBlackJack = function () {
	return (this.score === 21) ? true : false;
}

TablePlayer.prototype.showFirstRound = function () {
	return this.cardsToString();
};

function Player(name) {
	//La función se invoca con el operador new
	if (!(this instanceof Player))
		throw new InvalidAccessConstructorException();
	TablePlayer.call(this, name);
}
Player.prototype.constructor = Player;
Player.prototype = Object.create(TablePlayer.prototype);

function Dealer(name) {
	//La función se invoca con el operador new
	if (!(this instanceof Dealer))
		throw new InvalidAccessConstructorException();
	TablePlayer.call(this, name);
}
Dealer.prototype.constructor = Dealer;
Dealer.prototype = Object.create(TablePlayer.prototype);
Dealer.prototype.showFirstRound = function () {
	return this.cards[0].toString();
}

function Game() {
	//La función se invoca con el operador new
	if (!(this instanceof Game))
		throw new InvalidAccessConstructorException();
	// Definición de propiedades no configurables y de solo lectura.
	Object.defineProperty(this, "player", {
		value: new Player("player1"),
		enumerable: true,
		writable: false,
		configurable: false
	});
	Object.defineProperty(this, "dealer", {
		value: new Dealer("dealer"),
		enumerable: true,
		writable: false,
		configurable: false
	});
	Object.defineProperty(this, "deck", {
		value: new Deck(4),
		enumerable: true,
		writable: false,
		configurable: false
	});
}
Game.prototype.constructor = Game;
Game.prototype.playGame = function () {
	// Renovamos el mazo si estamos por encima del límite de cartas
	if (this.deck.upperLimit) this.deck.renewDeck();
	this.player.initPlay();
	this.dealer.initPlay();
	for (let i = 0; i < 2; i++) {
		this.player.addCard(this.deck.getNextCard());
		this.dealer.addCard(this.deck.getNextCard());
	}
};

Game.prototype.playPlayer = function () {
	this.player.addCard(this.deck.getNextCard());
};

Game.prototype.playDealer = function () {
	try {
		while (this.player.score <= 21
			&& this.dealer.score < this.player.score) {
			this.dealer.addCard(this.deck.getNextCard());
		}
	} catch (upper21Exception) {
	}
};

Game.prototype.checkPlayerWinner = function () {
	return !!((this.player.score <= 21
		&& (this.dealer.score > 21
			|| this.player.score >= this.dealer.score)));
};
Game.prototype.checkDealerWinner = function () {
	return !!((this.dealer.score <= 21
		&& (this.player.score > 21
			|| this.dealer.score >= this.player.score)));
};
