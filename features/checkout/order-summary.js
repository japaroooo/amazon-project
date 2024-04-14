import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.mjs';
import { getProduct } from '../../data/products.js';
import moneyFormat from '../../script/utils/money-format.js';
import { currentDate } from '../../script/utils/date-format.js';
import { deliveryOptions, getDeliveryOption } from '../../data/delivery-options.mjs';
import { renderPaymentSummary } from './payment-summary.js';

const cartList = document.querySelector('.cart-summary');


export function renderOrderSummary() {
  let generateHTML = ''

  if (!cart || cart.length < 1) {
    localStorage.removeItem('cart')
    generateHTML =
      `
  <div>Cart is Empty</div>
  <button><a href='main.html'>View Products</a></button>
  `
  } else {
    cart.forEach((cartItem) => {

      const { productId, deliveryOptionId } = cartItem

      const matchingProduct = getProduct(productId);
      const deliveryOption = getDeliveryOption(deliveryOptionId)

      const { id, priceCents, name } = matchingProduct

      generateHTML +=
        `
          <div class='cart-item-${id} cart-item'>
            <div class='delivery-date-title  js-delivery-item-${id}'>
            Delivery Date: ${currentDate(deliveryOption.deliveryDays)}
            </div>
          
            <div class='cart-item-details-grid'>
                <div class='item-details'>
                    <div class='item-name'>
                        <b>${name}</b>
                    </div>
                    <div class='item-price'>
                      <b class="red">$${moneyFormat(priceCents)}</b>
                    </div>
                    <div class='quantity-details'>
                      <div class='item-quantity'>Quantity: ${cartItem.quantity}</div>
                      <span class='js-update-button span-button'>Update</span>
                      <span class='js-delete-button span-button' data-product-id='${id}'>Delete</span>
                    </div>
                </div>
                <div class='delivery-details'>
                    <div class='js-choose-date deliveries-date'><b>Choose a delivery option</b>
                      
                      ${deliveryOptionsElements(id, cartItem)}
                    
                    </div>
                </div>
            </div>        
          </div>
       `
    });
  }
  cartList.innerHTML = generateHTML;

  function deliveryOptionsElements(productId, cartItem) {

    let html = ''

    deliveryOptions.forEach(delivery => {
      const { id, deliveryDays, priceCents } = delivery
      let isChecked = cartItem.deliveryOptionId === id

      html += `
    <div class='date-container js-delivery-option' data-product-id='${productId}' data-delivery-id='${id}' >
      <input type="radio" name="delivery-option-${productId}" ${isChecked ? 'checked' : ''}>
      <div>
        <div class='delivery-date green'><b>${currentDate(deliveryDays)}</b></div>
        <div class='delivery-price'>$${priceCents ? moneyFormat(priceCents) : 'FREE'} - Shipping</div>
      </div>
    </div>
    `

    })

    return html
  }


  document.querySelectorAll('.js-delete-button').forEach(button => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset

      removeFromCart(productId)
      document.querySelector(`.cart-item-${productId}`).remove()


      renderPaymentSummary()  // Render payment summary to update total items price
    })
  })


  document.querySelectorAll('.js-delivery-option').forEach(element => element.addEventListener('change', () => {
    const { productId, deliveryId } = element.dataset

    updateDeliveryOption(productId, deliveryId)

    renderOrderSummary()
    renderPaymentSummary()  // Render payment summary to update shipping fee
  }))
}
renderOrderSummary()
