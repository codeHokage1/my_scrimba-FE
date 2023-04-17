let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");


let homeScore = document.getElementById("home-score");
let guestScore = document.getElementById("guest-score");

let homeFouls = document.getElementById("home-fouls");
let guestFouls = document.getElementById("guest-fouls");

let countInterval;
const countDown = () => {
   seconds.innerText = 59;
   minutes.innerText = (parseInt(minutes.innerText) - 1);
   countInterval = setInterval(() => {
      if (parseFloat(minutes.textContent) <= 0) {
         clearInterval(countInterval);
         window.alert("Game Over!");
         return;
      }
      if (parseFloat(seconds.textContent) <= 0) {
         seconds.innerText = 59;
         minutes.innerText = (parseInt(minutes.innerText) - 1);
      }
      seconds.innerText = (parseInt(seconds.innerText) - 1);
   }, 1000)
}


const addScore = (team, score) => {
	if (team === "home") {
		homeScore.textContent = parseInt(homeScore.textContent) + score;
	} else {
		guestScore.innerText = parseInt(guestScore.innerText) + score;
	}
};

const addFoul = (team) => {
	if (team === "home") {
		homeFouls.innerText = parseInt(homeFouls.innerText) - 1;
	} else {
		guestFouls.innerText = parseInt(guestFouls.innerText) - 1;
	}
};

const newGame = () => {
	homeScore.innerText = "0.00";
	guestScore.innerText = "0.00";
	homeFouls.innerText = 5;
	guestFouls.innerText = 5;
   minutes.innerText = 60;
   seconds.innerText = "00";
   clearInterval(countInterval);
};
