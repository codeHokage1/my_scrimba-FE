import { characterData } from "./data.js";
import { Character } from "./Character.js";

const wizard = new Character(characterData.hero);
const orc = new Character(characterData.monster);

const render = () => {
	document.getElementById("hero").innerHTML = wizard.generateHTML();
	document.getElementById("monster").innerHTML = orc.generateHTML();
};
render();

function attack() {
	wizard.rollDice();
	let wizardScore = wizard.diceRoll.reduce((acc, curr) => acc + curr, 0);
	orc.rollDice();
	let orcScore = orc.diceRoll.reduce((acc, curr) => acc + curr, 0);
	const wizardPercentage = getRemainingHealth(orcScore, wizard.health);
	const orcPercentage = getRemainingHealth(wizardScore, orc.health);
	console.log("Wizard Current Percentage: ", 100 - wizardPercentage);
	console.log("Orc Current Percentage: ", 100 - orcPercentage);

	wizard.health -= orcScore;
	orc.health -= wizardScore;
	
	if (orc.health <= 0) {
		orc.health = 0;
	}
	if (wizard.health <= 0) {
		wizard.health = 0;
	}

	if (wizard.health === 0 || orc.health === 0) {
		const message = endGame()[0];
		console.log(message)
		const emoji = endGame()[1];
		document.body.innerHTML = `
			<div class="end-game">
				<h2>Game Over</h2>
				<h3>${message}</h3>
				<p class="end-emoji">${emoji}</p>
			<div>
		`
		return;
	}
	render();
}

document.getElementById("attack-button").addEventListener("click", attack);

const getRemainingHealth = (currentHealth, maxHealth) => {
	const remainingHealth = currentHealth / maxHealth * 100;
	return remainingHealth;
}

function endGame() {
	return wizard.health === 0 && orc.health === 0
		? ["No victors - all creatures are dead", "☠️"]
		: wizard.health > 0
		? ["The Wizard Wins", "🔮"]
		: ["The Orc is Victorious", "☠️"];
}

