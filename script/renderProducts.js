import { products } from '../data/products.js';
import { addToCart, updateCartQuantity } from '../data/cart.mjs';
import moneyFormat from '../script/utils/money-format.js';
import { generateHTML } from './product-catalog.js';

export function renderProducts() {
   products.forEach((product) => {
      generateHTML += `
        <div class='product-container' data-product-id='${product.id}'>
              <div class='product-name'>${product.name}</div>
              <div class='product-rating-container'> 
              <div> Star: ${product.rating.stars} </div>
              <div> Rating: ${product.rating.count} </div>
              </div>
              <div class='product-price'>$${moneyFormat(product.priceCents)}</div>
              
              <select class='js-quantity-selector-${product.id}'>
                  <option selected value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
              </select>
              <div class='added-to-cart'>✔ Added</div>
              <button class='add-cart'
              }' data-product-id='${product.id}'>Add to Cart</button>
        </div>
         `;
   });

   document.querySelector('.products-grid').innerHTML = generateHTML;

   document.querySelectorAll('.add-cart').forEach((button, index) => {
      button.addEventListener('click', () => {
         const { productId } = button.dataset;
         const itemQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

         addToCart(itemQuantity, productId);
         // showAddedToCart(index);
         const addCheck = document.querySelectorAll('.added-to-cart')[index];
         addCheck.classList.add('show-added-to-cart');

         // setTimeout(() => {
         //   addCheck.classList.remove('show-added-to-cart');
         // }, 2000);
         itemQuantity.selectedIndex = 0;
         renderProducts();
      });
   });


   const cartQuantity = updateCartQuantity();
   document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

   function showAddedToCart(index) {
      let addedMessage = document.querySelectorAll('.added-to-cart')[index];


   }
}
