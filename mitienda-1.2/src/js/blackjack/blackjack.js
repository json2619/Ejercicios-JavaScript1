const game = {
	dealerCards: [],
	playerCards: [],
	dealerScore: 0,
	playerScore: 0,
	deck: [],
};

function createDeck(num) {
	num = num || 1;
	game.deck.length = 0;
	for (let i = 0; i < num; i++) {
		for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
			for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
				const card = {
					suit: suits[suitIdx],
					value: values[valueIdx],
				};
				game.deck.push(card);
			}
		}
	}
}

function shuffleDeck() {
	for (let i = 0; i < game.deck.length; i++) {
		const swapIdx = Math.trunc(Math.random() * game.deck.length);
		const tmp = game.deck[swapIdx];
		game.deck[swapIdx] = game.deck[i];
		game.deck[i] = tmp;
	}
}

function initialTurn() {
	console.log(game.deck.length);
	game.playerCards.length = 0;
	game.dealerCards.length = 0;
	for (let i = 0; i < 2; i++) {
		game.playerCards.push(game.deck.shift());
		game.dealerCards.push(game.deck.shift());
	}
	game.dealerScore = getScore(game.dealerCards);
	game.playerScore = getScore(game.playerCards);
}

function getScore(cards) {
	let score = 0;
	let hasAce = 0;
	for (let i = 0; i < cards.length; i++) {
		score += getCardNumericValue(cards[i]);
		if (cards[i].value === 'A') {
			hasAce++;
		}
	}
	while (hasAce > 0 && score > 21) {
		score -= 10;
		hasAce--;
	}
	return score;
}

function getNextCard(cards) {
	cards.push(game.deck.shift());
}

function playDealer() {
	game.dealerScore = getScore(game.dealerCards);
	while (
		game.playerScore <= 21
		&& game.dealerScore < game.playerScore
		&& game.dealerScore < 21
	) {
		getNextCard(game.dealerCards);
		game.dealerScore = getScore(game.dealerCards);
	}
}

function playPlayer() {
	getNextCard(game.playerCards);
	game.playerScore = getScore(game.playerCards);
}

function cardsToString(cards) {
	let str = '';
	for (let i = 0; i < cards.length; i++) {
		str += `${cards[i].suit}-${cards[i].value}; `;
	}
	return str;
}

function checkBlackJack(cards) {
	return getScore(cards) === 21;
}

function isPlayerScoreUpperLimit() {
	return game.playerScore >= 21;
}

function checkPlayerWinner() {
	return !!(game.playerScore <= 21
		&& (game.dealerScore > 21 || game.playerScore >= game.dealerScore));
}

function checkDealerWinner() {
	return !!(game.dealerScore <= 21
		&& (game.playerScore > 21 || game.dealerScore >= game.playerScore));
}

function playGame() {
	if (game.deck.length < suits.length * values.length * 4 * 0.15) {
		createDeck(4);
		shuffleDeck();
	}
	initialTurn();
}

function getFirstRound(cards, player) {
	return player ? cardsToString(cards) : cardsToString([cards[0]]);
}

function test() {
	function cardTest() {
		let c1 = new Card(Card.suits[0], Card.values[0]);
		console.log(c1.toString()); // Corazón-A
		try {
			c1.suit = Card.suits[1];
		} catch (error) {
			// TypeError: Cannot assign to read only property 'suit' of object
			'[object Object]'
			console.log(error.toString());
		}
		try {
			c1.suit = Card.values[1];
		} catch (error) {
			// TypeError: Cannot assign to read only property 'suit' of object
			'[object Object]'
			console.log(error.toString());
		}
		try {
			let c2 = new Card("AAA", Card.values[0]);
		} catch (error) {
			// InvalidValueException: Error: The paramenter AAA has an invalidvalue. (AAA: suit)
			console.log(error.toString());
		}
		try {
			let c3 = new Card(Card.suits[0], "AAA");
		} catch (error) {
			// InvalidValueException: Error: The paramenter AAA has an invalidvalue. (AAA: value)
			console.log(error.toString());
		}
	}
	cardTest();
}
test();

function deckTest() {
	let deck = new Deck(4);
	deck.emptyDeck(function (card, index, upperLimit) {
		console.log(index + ": " + card.toString() + " (" + card.score + ") "
			+ upperLimit);
	});
}

function playerTest() {
	let deck = new Deck(4);
	let player = new Player("Player1");
	player.addCard(deck.getNextCard());
	player.addCard(deck.getNextCard());
	console.log("Primera mano " + player.name + ": " + player.showFirstRound());
	try {
		while (true) {
			player.addCard(deck.getNextCard());
			console.log(player.cardsToString() + ": " + player.score);
		}
	} catch (exception) {
		console.log(exception instanceof Upper21Exception); //true
		// Upper21Exception: The score is upper 21.
		console.log(exception.toString());
	}
	console.log(player.cardsToString() + ": " + player.score);
	let dealer = new Dealer("Dealer");
	dealer.addCard(deck.getNextCard());
	dealer.addCard(deck.getNextCard());
	console.log("Primera mano " + dealer.name + ": " + dealer.showFirstRound())
};
