export function Character(data) {
	Object.assign(this, data);

	this.getPlaceholderHTML = function () {
		return new Array(this.diceCount)
			.fill(0)
			.map((dice) => `<div class="placeholder-dice"></div>`)
			.join("");
	};

	this.generateHTML = function () {
		return `
      <div class="character-card">
        <h4 class="name"> ${this.name} </h4>
        <img class="avatar" src="${this.avatar}"/>
        <p class="health">health: <b> ${this.health} </b></p>
        <div class="dice-container">${this.diceRoll.length ? this.diceRoll
					.map((dice) => `<div class="dice"> ${dice} </div>`)
					.join("") : this.getPlaceholderHTML()}
			</div>
      </div>`;
	};

	
	this.rollDice = function () {
		this.diceRoll = new Array(this.diceCount)
			.fill(0)
			.map(() => Math.ceil(Math.random() * 6));
	};
}
