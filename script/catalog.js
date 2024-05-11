import { loadProducts, products } from '../data/products.js';
import cart from '../data/cart-class.js';


loadProducts(renderProducts)

function renderProducts() {
   let generateHTML = ''

   products.forEach((product) => {
      generateHTML += `
        <div class='product-container' data-product-id='${product.id}'>
              <h3 class='product-name'>${product.name}</h1>
              <div class='product-rating-container'> 
              <div> Star: ${product.rating.stars} </div>
              <div> Rating: ${product.rating.count} </div>
              </div>
              <h3 class='product-price'>${product.getPrice()}</h3>
              
              <select class='js-quantity-selector-${product.id}'>
                  <option selected value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
              </select>
              <div class='added-to-cart'>✔ Added</div>
              <button class='add-cart primary-button' data-product-id='${product.id}'>Add to Cart</button>
        </div>
         `;
   });

   document.querySelector('.products-grid').innerHTML = generateHTML;

   document.querySelectorAll('.add-cart').forEach((button, index) => {
      button.addEventListener('click', () => {

         const { productId } = button.dataset;
         const itemQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

         cart.addToCart(+itemQuantity.value, productId);
         showAddCheck(index);
         document.querySelector('.js-cart-quantity').innerHTML = cart.updateCartQuantity()
         itemQuantity.selectedIndex = 0;
      });
   });


   function showAddCheck(index) {
      const addCheck = document.querySelectorAll('.added-to-cart')[index]
      addCheck.classList.add('show-added-to-cart');
      setTimeout(() => {
         addCheck.classList.remove('show-added-to-cart');
      }, 2000);
   }

}
document.querySelector('.js-cart-quantity').innerHTML = cart.updateCartQuantity()



