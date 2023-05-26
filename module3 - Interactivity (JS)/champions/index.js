import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
   databaseURL: "https://champion-e732b-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSetting);
const db = getDatabase(app);
const endorsements = ref(db, "endorsements");

const endorsementsDIV = document.querySelector('.endorsements');
const entry = document.querySelector('#comment');

const publishBtn = document.querySelector('.publish');

publishBtn.addEventListener('click', () => {
   if (!entry.value) return;
   push(endorsements, entry.value);
   const newEndorsement = `
      <div class="endorsement">
         <p>${entry.value}</p>
      </div>
   `
   endorsementsDIV.innerHTML += newEndorsement;
   entry.value = '';
})

