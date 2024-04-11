import { cart, removeFromCart } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { moneyFormat } from '../../script/utils/money-format.js';

const cartList = document.querySelector('.cart-summary');

let matchingProduct;
let cartProducts = '';

if (!cart) {
  cartList.innerHTML = `
  <div class="cart-summary">
    <p>Your cart is empty</p>
    <button>View Products</button>
  </div>
`;
} else {
  cart.forEach((cartItem) => {
    let productId = cartItem.productId;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    let html = `
    <div class='cart-item-${matchingProduct.id} cart-item'>
      <div class='delivery-date date-item-${matchingProduct.id}'>
      Date
      </div>
    
      <div class='cart-item-details-grid'>
          <div class='item-details'>
              <div class='item-name'>
                  <b>${matchingProduct.name}</b>
              </div>
              <div class='item-price'>
                <b class="red">$${moneyFormat(matchingProduct.priceCents)}</b>
              </div>
              <div class='quantity-details'>
                <div class='item-quantity'>Quantity: ${cartItem.quantity}</div>
                <span class='js-update-button span-button'>Update</span>
                <span class='js-delete-button span-button' data-product-id='${matchingProduct.id}'>Delete</span>
              </div>
          </div>
          <div class='delivery-details'>
              <div class='js-choose-date deliveries-date'><b>Choose a delivery option</b>
                <div class='date-container'><input type="radio" name="delivery-option-${matchingProduct.id}"><div>${currentDate()}</div></div>
                <div class='date-container'><input type="radio" name="delivery-option-${matchingProduct.id}"><div>${currentDate(1)}</div></div>
                <div class='date-container'><input type="radio" name="delivery-option-${matchingProduct.id}"><div>${currentDate(2)}</div></div>
              </div>
          </div>
      </div>        
    </div>
            `;

    cartProducts += html;
  });

  cartList.innerHTML = cartProducts;
}



document.querySelectorAll('.js-delete-button').forEach(button => {
  button.addEventListener('click', () => {
    const { productId } = button.dataset

    removeFromCart(productId)
    document.querySelector(`.cart-item-${productId}`).remove()
  })
})


function currentDate(dayToAdd) {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = new Date();
  if (dayToAdd) {
    date.setDate(date.getDate() + dayToAdd);
  }
  let day = weekday[date.getDay()];
  let month = months[date.getMonth()];
  let dateFormat = `${day}, ${month} ${date.getDate()}`;

  return dateFormat;
}
