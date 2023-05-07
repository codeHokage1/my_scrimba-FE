import { menuArray } from './data.js';

const menu = document.querySelector(".menu");

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
               <button class="order-btn">+</button>
               
            </div>
         </div>
      `
      menu.innerHTML += order;
   })
}

renderMenu();

