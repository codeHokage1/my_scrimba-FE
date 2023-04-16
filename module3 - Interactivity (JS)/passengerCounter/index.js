let passengers = document.getElementById('passengers');
let savedPassengers = document.getElementById('saved-numbers');

let count = passengers.innerText;
const increase = () => {
   count++;
   passengers.innerText = count;
}

const save = () => {
   savedPassengers.textContent += count + " - ";
   count = 0;
   passengers.innerText = count;
}
