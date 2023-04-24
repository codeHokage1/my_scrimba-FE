const entry = document.querySelector("#entry");

const emojiContainer = document.querySelector("#emoji-container");

const addEndBtn = document.querySelector("#add-end");
const deleteEndBtn = document.querySelector("#delete-end");
const addBeginningBtn = document.querySelector("#add-beginning");
const deleteBeginningBtn = document.querySelector("#delete-beginning");

let emojis = ["👑", "👨‍💻", "☪️"]

const renderEmojis = () => {
   emojiContainer.innerHTML = "";
   emojis.forEach((emoji) => {
      const emojiEl = document.createElement("span");
      emojiEl.innerText = emoji;
      emojiContainer.appendChild(emojiEl);
   })
}

renderEmojis();

addEndBtn.addEventListener("click", () => {
   if (entry.value === "") return;
   emojis.push(entry.value);
   renderEmojis();
})

addBeginningBtn.addEventListener("click", () => {
   if (entry.value === "") return;
   emojis.unshift(entry.value);
   renderEmojis();
})

deleteEndBtn.addEventListener("click", () => {
   emojis.pop(entry.value);
   renderEmojis();
})

deleteBeginningBtn.addEventListener("click", () => {
   emojis.shift(entry.value);
   renderEmojis();
})