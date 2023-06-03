function Character(data) {
	Object.assign(this, data);
	this.generateHTML = function () {
		document.getElementById(this.id).innerHTML = `
      <div class="character-card">
        <h4 class="name"> ${this.name} </h4>
        <img class="avatar" src="${this.avatar}"/>
        <p class="health">health: <b> ${this.health} </b></p>
        <div class="dice-container">${this.diceRoll
					.map((dice) => `<div class="dice"> ${dice} </div>`)
					.join("")}</div>
      </div>`;
	};
	this.rollDice = function () {
      this.diceRoll = new Array(this.diceCount).fill(0).map(() => Math.ceil(Math.random() * 6));
      this.generateHTML()
   };
}
const data1 = {
	id: "hero",
	name: "Wizard",
	avatar: "images/wizard.png",
	health: 60,
	diceRoll: [],
	diceCount: 3,
};

const data2 = {
	id: "monster",
	name: "Orc",
	avatar: "images/orc.png",
	health: 10,
	diceRoll: [],
	diceCount: 1,
};

const hero = new Character(data1);
const monster = new Character(data2);


hero.generateHTML();
monster.generateHTML();

function attack() {
	hero.rollDice();
	monster.rollDice();
}

document.getElementById("attack-button").addEventListener("click", attack);
