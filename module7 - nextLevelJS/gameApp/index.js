const hero = {
   id: 'hero',
   name: 'Wizard',
   avatar: 'images/wizard.png',
   health: 60,
   diceRoll: [],
   diceCount: 3
}

const monster = {
   id: 'monster',
   name: 'Orc',
   avatar: 'images/orc.png',
   health: 10,
   diceRoll: [],
   diceCount: 1
}

function renderCharacter({id, name, avatar, health, diceRoll, diceCount}){
  document.getElementById(id).innerHTML = 
    `<div class="character-card">
        <h4 class="name"> ${name} </h4>
        <img class="avatar" src="${avatar}"/>
        <p class="health">health: <b> ${health} </b></p>
        <div class="dice-container">${diceRoll.map(dice => `<div class="dice"> ${dice} </div>`).join('')}</div>
    </div>`;   
}

renderCharacter(hero);
renderCharacter(monster);

function rollDice (diceCount) {
  return new Array(diceCount).fill(0).map(dice => Math.ceil(Math.random() * 6));
}

function attack() {
   hero.diceRoll = rollDice(hero.diceCount);
   monster.diceRoll = rollDice(monster.diceCount);

   renderCharacter(hero);
   renderCharacter(monster);
}

document.getElementById('attack-button').addEventListener('click', attack);