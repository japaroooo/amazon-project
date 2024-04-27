import { products } from '../data/products.js';
import { addToCart, cart, updateCartQuantity } from '../data/cart.mjs';
import moneyFormat from '../script/utils/money.js';


let generateHTML = '';

function renderProducts() {
  products.forEach((product) => {
    generateHTML += `
        <div class='product-container' data-product-id='${product.id}'>
              <div class='product-name'>${product.name}</div>
              <div class='product-rating-container'> 
              <div> Star: ${product.rating.stars} </div>
              <div> Rating: ${product.rating.count} </div>
              </div>
              <div class='product-price'>${product.getPrice()}</div>
              
              <select class='js-quantity-selector-${product.id}'>
                  <option selected value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
              </select>
              <div class='added-to-cart'>✔ Added</div>
              <button class='add-cart' data-product-id='${product.id}'>Add to Cart</button>
        </div>
         `;
  });

  document.querySelector('.products-grid').innerHTML = generateHTML;

  document.querySelectorAll('.add-cart').forEach((button, index) => {
    button.addEventListener('click', () => {

      const { productId } = button.dataset;
      const itemQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

      addToCart(itemQuantity.value, productId);
      showAddCheck(index);
      document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity()


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

renderProducts()
document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity()



