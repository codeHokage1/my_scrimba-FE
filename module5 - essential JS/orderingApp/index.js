import { menuArray } from "./data.js";

const menu = document.querySelector(".menu");
const checkoutDetails = document.querySelector(".checkout-details");

const renderMenu = () => {
	menu.innerHTML = "";

	menuArray.forEach((item) => {
		let order = `
         <div class="order" id="${item.id}">
            <div>
               <span class="order-logo">${item.emoji}</span>
            </div>
           
            <div class="order-details">
               <h3 class="order-name">${item.name}</h3>
               <p>
                  ${item.ingredients.join(", ")}
               </p>
               <h3 class="order-price">$${item.price}</h3>
            </div>

            <div class="order-btn-box">
               <button class="order-btn" data-add="${item.id}">+</button>
            </div>
         </div>
      `;
		menu.innerHTML += order;
	});
};

renderMenu();

let cart = [];

const renderCheckout = () => {
	if (cart.length) {
		document.querySelector(".checkout").classList.remove("hidden");
		console.log(cart);

		checkoutDetails.innerHTML = "";
		for (let item of cart) {
			let checkoutItem = `
            <div class="checkout-item">
               <p class="checkout-item-name">${item.name}</p>
               <p class="remove" data-remove="${item.id}">remove</p>
               <p class="checkout-item-price">$${
									item.price
								} <span class="quantity">X ${item.quantity}</span> = $${
				item.price * item.quantity
			}</p>
            </div
         `;
			checkoutDetails.innerHTML += checkoutItem;
		}
		let total = `
         <div class="total">
            <p>Total price:<p>
            <p class="total-price">
               $${cart.reduce(
									(acc, item) => acc + item.price * item.quantity,
									0
								)}
            </p>
         </div>
      `;
		checkoutDetails.innerHTML += total;
	} else {
		document.querySelector(".checkout").classList.add("hidden");
	}
};

document.addEventListener("click", (e) => {
	const addItem = e.target.dataset.add;
	const deleteItem = e.target.dataset.remove;

	if (e.target.id === "complete-order") {
		document.querySelector(".payment-modal").classList.remove("hidden");
	}
	if (e.target.id === "back-to-shop") {
		document.querySelector(".payment-modal").classList.add("hidden");
	}

	if (addItem) {
		const foundItem = menuArray.find((item) => item.id === Number(addItem));
		const foundInCart = cart.find((item) => item.id === foundItem.id);
		if (foundInCart) {
			foundInCart.quantity++;
		} else {
			const newCartItem = {
				id: foundItem.id,
				name: foundItem.name,
				price: foundItem.price,
				quantity: 1,
			};
			cart.push(newCartItem);
		}
		renderCheckout();
	} else if (deleteItem) {
		cart = cart.filter((item) => item.id !== Number(deleteItem));
		renderCheckout();
	}
});

const paymentForm = document.querySelector(".payment-form");
paymentForm.addEventListener("submit", (e) => {
   const formData = new FormData(paymentForm)
   
	e.preventDefault();
   document.querySelector(".payment-modal").innerHTML = `
      <div class="loader">
         <img src="images/payment-loading.gif" alt="A loader signifying a loading process">
         <p>Processing Payment...</p>
      </div>
   `;
	setTimeout(() => {
		document.querySelector(".payment-modal").innerHTML = `
      <div class="loader">
         <img src= "https://img.icons8.com/?size=512&id=118946&format=png" alt="Payment done">
         <p>Payment Succesful!</p>
      </div>
   `;
	}, 7000);
	setTimeout(() => {
		document.querySelector(".payment-modal").classList.add("hidden");
   }, 10000);
   
   const checkout = document.querySelector(".checkout");
   const paymentDone = document.querySelector(".payment-done");

   setTimeout(() => {
      checkout.classList.add("hidden");
      paymentDone.classList.remove("hidden");
      paymentDone.innerHTML = `
         <p>Thanks, ${formData.get("name")}! Your order is on its way.</p>
      `
      document.querySelector(".main").style.paddingBottom = "30px";
   }, 11000);

   cart = [];
   setTimeout(() => {
		paymentDone.classList.add("hidden");
      document.querySelector(".main").style.paddingBottom = "0";
   }, 14000);
});
