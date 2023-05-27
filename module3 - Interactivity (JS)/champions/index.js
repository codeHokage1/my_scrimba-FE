import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
	update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
	databaseURL: "https://champion-e732b-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSetting);
const db = getDatabase(app);
const endorsements = ref(db, "endorsements");

const endorsementsDIV = document.querySelector(".endorsements");
const entry = document.querySelector("#comment");
const fromVal = document.querySelector(".from");
const toVal = document.querySelector(".to");

const publishBtn = document.querySelector(".publish");

publishBtn.addEventListener("click", () => {
	if (!entry.value || !toVal.value) return;
	let sender = fromVal.value || "Anonymous";
	let endorsement = {
		to: toVal.value,
		endorsement: entry.value,
		from: sender,
		isLiked: false,
		likes: 0,
	};

	push(endorsements, endorsement);

	entry.value = "";
	fromVal.value = "";
	toVal.value = "";
});

function fetchEndorsements() {
	onValue(endorsements, (snapshot) => {
		if (!snapshot.exists()) {
			endorsementsDIV.innerHTML =
				'<p style="color: white; font-size: 1.2rem">No endorsements yet</p>';
			return;
		}
		const data = snapshot.val();
		console.log(Object.entries(data));
		const endorsements = Object.entries(data);
		endorsementsDIV.innerHTML = "";

		endorsements.forEach((endorsement) => {
			const endorsementHTML = `
            <div class="endorsement" id='${endorsement[0]}'>
               <h3>To: ${endorsement[1].to}</h3>
               <p>${endorsement[1].endorsement}</p>
               <div class='comment-footer'>
                  <h3>From: ${endorsement[1].from}</h3>
                  ${endorsement[1].likes
                                 ? `<div class='comment-likes'>
                                       <i class="fa-solid fa-heart ${endorsement[1].isLiked ? 'like' : null}"></i>
                                       <p>${endorsement[1].likes}</p>
                                    </div>`
											: ""
						}
               </div>
            </div>
         `;
			endorsementsDIV.innerHTML += endorsementHTML;
		});

		const allEndorsements = document.querySelectorAll(".endorsement");
		allEndorsements.forEach((endorsement) => {
			endorsement.addEventListener("dblclick", () => {
				let exactItem = ref(db, `endorsements/${endorsement.id}`);
				let likes = 0;
				let isLiked = false;
				onValue(exactItem, (snapshot) => {
					console.log(snapshot.val());
					likes = snapshot.val().likes;
					isLiked = snapshot.val().isLiked;
				});

				if (!isLiked) {
					update(exactItem, { isLiked: true, likes: likes + 1 });
				} else {
					update(exactItem, { isLiked: false, likes: likes - 1 });
				}
			});
		});
	});
}

fetchEndorsements();
