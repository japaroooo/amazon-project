import { cart } from '../../data/cart.js';
import { products } from '../../data/products.js';

const cartList = document.querySelector('.cart-summary');

let matchingProduct;
let cartProducts = '';

cart.forEach((cartItem) => {
  let productId = cartItem.productId;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  let html = `
    <div class='cart-item'>
      <div class='delivery-date'>
        Date
      </div>

      <div class='cart-item-details-grid'>
       <div class='item-details'>
          <div class='item-name'>
          <b>${matchingProduct.name}</b>
          </div>
          <div class='item-price'>
          <b class="red">$${matchingProduct.priceCents}</b>
          </div>
          <div class='quantity-details'>
            <div class='item-quantity'>Quantity: ${cartItem.quantity}</div>
            <span>Update</span>
            <span>Delete</span>
          </div>
       </div>
       <div class='delivery-details'>
        <div class='js-choose-date'><b>Choose a delivery option</b></div>
          <div><input type="radio" name="" id="js-delivery-date">${currentDate()}</div>
          <div><input type="radio" name="" id="js-delivery-date">${currentDate(
            1
          )}</div>
          <div><input type="radio" name="" id="js-delivery-date">${currentDate(
            2
          )}</div>
       </div>
      </div>

    </div>
  `;

  cartProducts += html;
});

console.log(cart);
if (cart.length < 1) {
  cartList.innerHTML = `
  <div class="cart-summary">
      <p>Your cart is empty</p>
      <button>View Products</button>
    </div>
  `;
} else {
  cartList.innerHTML = cartProducts;
}

function selectDate() {
  const radioDate = document
    .querySelectorAll('#js-delivery-date')
    .forEach((radio) => console.log(radio));

  console.log(radioDate);
}
selectDate();

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
