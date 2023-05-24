import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSetting = {
   databaseURL: "https://addtocart-61a59-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSetting);
const db = getDatabase(app);
const itemsInCart = ref(db, 'itemsInCart');

console.log(app);
const inputField = document.querySelector('#input-field');
const addBtn = document.querySelector('#add-button');

const saveItem = async (item) => {
   await push(itemsInCart, item);
   alert(`You added ${item} to your cart!`);
}

addBtn.addEventListener('click', async() => {
   if (inputField.value) {
      await saveItem(inputField.value);
      inputField.value = '';
   }
})