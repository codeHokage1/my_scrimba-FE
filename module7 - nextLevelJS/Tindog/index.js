import { Dog } from "./Dog.js";
import { dogs } from "./data.js";

const dogProfile = document.querySelector(".dog-profile");

function displayDog(dogData) {
   const newDog = new Dog(dogData);
   const dogHTML = `
      <div class="details">
         <img
            src="./images/dog-${(newDog.name).toLowerCase()}.jpg"
            alt="Picture of ${newDog.name}"
         />
         <div class="info">
            <h2>${newDog.name}, ${newDog.age}</h2>
            <p>${newDog.bio}</p>
         </div>
      </div>
      <div class="actions">
         <img class="cross-profile ${newDog.name}" src="./images/icon-cross.png" alt="Cross Icon" />
         <img class="like-profile ${newDog.name}" src="./images/icon-heart.png" alt="Like Icon" />
      </div>
   `;

   dogProfile.innerHTML = dogHTML;
}
displayDog(dogs[0])
console.log(dogs)

function likeProfile(dog) {
   dog.hasBeenLiked = !dog.hasBeenLiked;
   console.log(dog.hasBeenLiked);
}

function crossProfile(dog) {
   dog.hasBeenSwiped = !dog.hasBeenSwiped;
   console.log(dog.hasBeenSwiped);
}

document.querySelector(".like-profile").addEventListener("click", (e) => {
   const likedDog = e.target.classList.value.split(' ')[1];
   const foundDog = dogs.find(dog => dog.name === likedDog);
   likeProfile(foundDog);
   console.log(dogs)
})

document.querySelector(".cross-profile").addEventListener("click", (e) => {
   const swipedDog = e.target.classList.value.split(' ')[1];
   const foundDog = dogs.find(dog => dog.name === swipedDog);
   crossProfile(foundDog);
   console.log(dogs)
})