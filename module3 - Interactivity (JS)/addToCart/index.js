import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
	databaseURL: "https://addtocart-61a59-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSetting);
const db = getDatabase(app);
const itemsInCart = ref(db, "itemsInCart");

const inputField = document.querySelector("#input-field");
const addBtn = document.querySelector("#add-button");

const itemsList = document.querySelector(".itemsList");

const fetchItems = async () => {
	itemsList.innerHTML = "";
	await onValue(itemsInCart, function (snapshot) {
		if (!snapshot.val()) {
			itemsList.innerHTML = "";
			return;
		}
		let dbItems = Object.entries(snapshot.val());
		itemsList.innerHTML = "";
		dbItems.forEach((item) => {
			// items += `<li>${item}</li>`;
			let listItem = document.createElement("li");
			listItem.innerText = item[1];
			itemsList.append(listItem);
			listItem.addEventListener("dblclick", () => {
				let exactItem = ref(db, `itemsInCart/${item[0]}`);
				remove(exactItem);
				console.log(`${item[0]} removed`);
			});
		});
	});
};
fetchItems();

const addItem = async (listItem) => {
	await push(itemsInCart, listItem);
	// await fetchItems();

	inputField.value = "";
};

addBtn.addEventListener("click", async () => {
	if (inputField.value) {
		await addItem(inputField.value);
	}
});
