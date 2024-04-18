import { cart, removeFromCart, updateCartQuantity, calculateCartQuantity, updateDeliveryOption } from '../../data/cart.mjs';
import { getProduct } from '../../data/products.js';
import moneyFormat from '../../script/utils/money-format.js';
import { calculateDeliveryDate, isWeekend } from '../../script/utils/date-format.js';
import { deliveryOptions, getDeliveryOption } from '../../data/delivery-options.mjs';
import { renderPaymentSummary } from './payment-summary.js';
import { renderHeader } from './checkoutHeader.js';


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
            Delivery Date: ${calculateDeliveryDate(deliveryOption.deliveryDays).dateString}
            </div>
          
            <div class='cart-item-details-grid'>
                <div class='item-details'>
                    <div class='item-name'>
                        <b>${name}</b>
                    </div>
                    <div class='item-price'>
                      <b class="red">$${moneyFormat(priceCents)}</b>
                    </div>
                    <div class='quantity-container quantity-details-${id}'>
                      ${quantityElement(cartItem.quantity, id)}
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


  /**
 * * Delivery Option element
 */
  function deliveryOptionsElements(productId, cartItem) {
    let html = ''
    deliveryOptions.forEach(delivery => {
      let { id, deliveryDays, priceCents } = delivery
      let isChecked = cartItem.deliveryOptionId === id

      const deliveryDate = calculateDeliveryDate(deliveryDays)
      const isSatSun = isWeekend(deliveryDate.dateToday)


      html +=
        `
          <div class='date-container js-delivery-option' data-product-id='${productId}' data-delivery-id='${id}' >
            <input type="radio" name="delivery-option-${productId}" ${isChecked && 'checked'}>
            <div>
              <div class='delivery-date green'><b>${deliveryDate.dateString}</b></div>
              <div class='delivery-price'>$${priceCents ? moneyFormat(priceCents) : 'FREE'} - Shipping</div>
             ${isSatSun ? '<div class="red-text">No delivery for weekends</div>' : '<div> </div>'}
            </div>
          </div>
        `
    })
    //  
    return html
  }

  /**
   * * Quantity update element 
   */
  function quantityElement(quantity, id) {
    let html =
      `
        <div class='item-quantity-${id}'>Quantity: ${quantity}</div>
        <span class='js-update-button span-button' data-product-id='${id}'>Update</span>
        <span class='js-delete-button span-button' data-product-id='${id}'>Delete</span>
      `
    return html
  }


  /**
   * * Update Quantity input
   */
  document.querySelectorAll('.js-update-button').forEach(button => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset

      // console.log(productId);
      const quantityHTML = document.querySelector(`.quantity-details-${productId}`)

      quantityHTML.innerHTML =
        `
        Quantity: 
        <input type='text' class='js-input-value'>
        <span class='js-save-button span-button' data-product-id='${productId}'>Save</span>
        `

      document.querySelector('.js-save-button').addEventListener('click', () => {
        let inputValue = quantityHTML.children[0].value

        if (!inputValue || inputValue < 1) inputValue = 1

        quantityHTML.innerHTML = quantityElement(inputValue, productId)
        calculateCartQuantity(inputValue, productId)

        renderOrderSummary()
        renderPaymentSummary()
      })

    })
  })

  /**
   * * Delete Product click
   */
  document.querySelectorAll('.js-delete-button').forEach(button => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset

      removeFromCart(productId)
      // document.querySelector(`.cart-item-${productId}`).remove()

      renderHeader()
      renderOrderSummary()
      renderPaymentSummary()  // Render payment summary to update total items price
    })
  })

  /**
   * * Delivery Option changes
   */
  document.querySelectorAll('.js-delivery-option').forEach(element => element.addEventListener('change', (e) => {
    // e.preventDefault()
    const { productId, deliveryId } = element.dataset

    updateDeliveryOption(productId, deliveryId)

    renderOrderSummary()
    renderPaymentSummary()  // Render payxent summary to update shipping fee
  }))
}

// renderOrderSummary()
