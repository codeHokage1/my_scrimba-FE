let gameMessage = document.getElementById("game-message");

let cardsEl = document.getElementById("cards");
let sumEl = document.getElementById("sum");

let playerEl = document.getElementById("player");

let errorEl = document.getElementById("error");

const generateCard = () => {
	return Math.floor(Math.random() * 13) + 1 > 10
		? 10
		: Math.floor(Math.random() * 13) + 1 === 1
		? 11
		: Math.floor(Math.random() * 13) + 1;
};

let cards = [];
let startedGame = false;
let gotBlackJack = false;

const renderGame = () => {
	cardsEl.textContent = "Cards: ";
	sumEl.textContent = "Sum: ";
	for (let card of cards) {
		cardsEl.textContent += card + " ";
	}
	let sum = cards.reduce((a, b) => a + b, 0);
	sumEl.textContent += sum;

	if (sum < 21) {
		gameMessage.textContent = "Do you want to draw a new card?";
	} else if (sum === 21) {
		gameMessage.textContent = "Black Jack! You win!";
		gotBlackJack = true;
	} else {
		gameMessage.textContent = "Eish. Game over!";
		startedGame = false;
	}
};

const startGame = () => {
	if (!startedGame) {
		startedGame = true;
		let firstCard = generateCard(),
			secondCard = generateCard();
		cards = [firstCard, secondCard];
		renderGame();
	} else {
		errorEl.textContent =
			"You already started the game! Click 'New Card' to continue";
		setTimeout(() => {
			errorEl.textContent = "";
		}, 3000);
	}
};

const newCard = () => {
	if (startedGame === true && gotBlackJack === false) {
		cards.push(generateCard());
		renderGame();
	} else {
		let message = !startedGame
			? "You need to start a New Game"
         : "You already got Black Jack! You can start a New Game";
      errorEl.textContent = message;
      setTimeout(() => {
         errorEl.textContent = "";
      }, 3000);
	}
};
