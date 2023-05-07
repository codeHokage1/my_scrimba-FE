import { menuArray } from './data.js';

const menu = document.querySelector(".menu");
const checkoutDetails = document.querySelector(".checkout-details");

const renderMenu = () => {
   menu.innerHTML = '';

   menuArray.forEach((item) => {
      let order = `
         <div class="order" id="${item.id}">
            <div>
               <span class="order-logo">${item.emoji}</span>
            </div>
           
            <div class="order-details">
               <h3 class="order-name">${item.name}</h3>
               <p>
                  ${item.ingredients.join(', ')}
               </p>
               <h3 class="order-price">$${item.price}</h3>
            </div>

            <div class="order-btn-box">
               <button class="order-btn" data-add="${item.id}">+</button>
            </div>
         </div>
      `
      menu.innerHTML += order;
   })
}

renderMenu();

let cart = [];

const renderCheckout = () => {
   if (cart.length) {
      document.querySelector(".checkout").classList.remove('hidden');
      console.log(cart);

      checkoutDetails.innerHTML = '';
      for (let item of cart) {
         let checkoutItem = `
            <div class="checkout-item">
               <p class="checkout-item-name">${item.name}</p>
               <p class="remove" data-remove="${item.id}">remove</p>
               <p class="checkout-item-price">$${item.price} <span class="quantity">X ${item.quantity}</span> = $${item.price * item.quantity}</p>
            </div
         `
         checkoutDetails.innerHTML += checkoutItem;
      }
      let total = `
         <div class="total">
            <p>Total price:<p>
            <p class="total-price">
               $${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </p>
         </div>
      `
      checkoutDetails.innerHTML += total;
   } else {
      document.querySelector(".checkout").classList.add('hidden');
   }
   
}

document.addEventListener("click", (e) => {
   const addItem = e.target.dataset.add;
   const deleteItem = e.target.dataset.remove;

   if (addItem) {
      const foundItem = menuArray.find((item) => item.id === Number(addItem));
      const foundInCart = cart.find(item => item.id === foundItem.id)
      if (foundInCart) {
         foundInCart.quantity++;
      } else {
         const newCartItem = {
            id: foundItem.id,
            name: foundItem.name,
            price: foundItem.price,
            quantity: 1
         }
         cart.push(newCartItem);
      }
      renderCheckout();
   } else if (deleteItem) {
      cart = cart.filter((item) => item.id !== Number(deleteItem));
      renderCheckout();
   }
})
