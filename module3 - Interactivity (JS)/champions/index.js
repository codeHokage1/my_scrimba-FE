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
const fromVal = document.querySelector('.from');
const toVal = document.querySelector('.to');


const publishBtn = document.querySelector('.publish');

publishBtn.addEventListener('click', () => {
   if (!entry.value || !toVal.value) return;
   let sender = fromVal.value || 'Anonymous';
   let endorsement = {
      to: toVal.value,
      endorsement: entry.value,
      from: sender
   }

   push(endorsements, endorsement);
   
   entry.value = '';
   fromVal.value = '';
   toVal.value = '';
})

function fetchEndorsements() {
   onValue(endorsements, (snapshot) => {
      if (!snapshot.exists()) {
         endorsementsDIV.innerHTML = '<p style="color: white; font-size: 1.2rem">No endorsements yet</p>';
         return;
      }
      const data = snapshot.val();
      console.log(Object.entries(data))
      const endorsements = Object.values(data);
      const endorsementsHTML = endorsements.map(endorsement => {
         return `
            <div class="endorsement">
               <h3>To: ${endorsement.to}</h3>
               <p>${endorsement.endorsement}</p>
               <h3>From: ${endorsement.from}</h3>
            </div>
         `
      }).join('');
      endorsementsDIV.innerHTML = endorsementsHTML;
   })
}

fetchEndorsements()

