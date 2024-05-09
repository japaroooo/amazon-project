import cart from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import moneyFormat from '../../script/utils/money.js';
import { calculateDeliveryDate, isWeekend } from '../../script/utils/date-format.js';
import { deliveryOptions, getDeliveryOption } from '../../data/delivery-options.mjs';
import { renderPaymentSummary } from './payment-summary-class.js';
import { renderHeader } from './checkout-header-class.js';

// renderOrderSummary()

export function renderOrderSummary() {
   let generateHTML = ''
   cart.cartItems.forEach((cartItem) => {
      const { productId, deliveryOptionId, quantity } = cartItem

      const matchingProduct = getProduct(productId);
      const deliveryOption = getDeliveryOption(deliveryOptionId)

      generateHTML +=
         `
           <div class='cart-item-${matchingProduct.id} js-cart-item card'>
             <span>Delivery Date:</span>
             <div class='delivery-date-title green js-delivery-item-${matchingProduct.id}'>
                ${calculateDeliveryDate(deliveryOption.deliveryDays).dateString}
             </div>
           
             <div class='cart-item-details-grid'>
                 <div class='item-details'>
                     <div class='item-name'>
                         <b>${matchingProduct.name}</b>
                     </div>
                     <div class='item-price'>
                         <b class="green">${matchingProduct.getPrice()}</b>
                     </div>
                     <div class='quantity-container quantity-details-${matchingProduct.id}'>
 
                         <div class='item-quantity-${matchingProduct.id}'>
                           Quantity: ${quantity}
                         </div>
 
                         <span class='js-update-button span-button' data-product-id='${matchingProduct.id}'>
                           Update
                         </span>
 
                         <span class='js-delete-button red js-delete-link-${matchingProduct.id} span-button' data-product-id='${matchingProduct.id}'>
                           Delete
                         </span>
 
                     </div>
                 </div>
                 <div class='delivery-details'>
                     <div class='js-choose-date deliveries-date'><b>Choose a delivery option</b>
                       ${deliveryOptionsElements(matchingProduct.id, deliveryOptionId)}
                     </div>
                 </div>
             </div>
           </div>
        `
   });

   document.querySelector('.js-cart-summary').innerHTML = generateHTML;



   /**
   * * Delivery Option element
   */
   function deliveryOptionsElements(productId, deliveryOptionId) {
      let html = ''



      deliveryOptions.forEach(delivery => {
         let { id, deliveryDays, priceCents } = delivery
         let isChecked = deliveryOptionId === id

         const deliveryDate = calculateDeliveryDate(deliveryDays)
         const isSatSun = isWeekend(deliveryDate.dateToday)


         html +=
            `
           <div class='date-container js-delivery-option js-product-id-${productId} js-delivery-id-${id}' data-product-id='${productId}' data-delivery-id='${id}' >
             <input type="radio" ${isChecked ? 'checked' : ''}>
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

            if (inputValue < 1) inputValue = 1

            cart.calculateCartQuantity(+inputValue, productId)
            quantityHTML.innerHTML = quantityElement(inputValue, productId)

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

         cart.removeFromCart(productId)

         renderHeader()
         renderOrderSummary()
         renderPaymentSummary()

      })
   })

   /**
    * * Delivery Option changes
    */
   document.querySelectorAll('.js-delivery-option').forEach(input => {
      input.addEventListener('change', async (e) => {
         e.preventDefault()
         const { productId, deliveryId } = input.dataset

         cart.updateDeliveryOption(productId, deliveryId)

         renderOrderSummary()
         renderPaymentSummary()

      })
   })
}

function quantityElement(inputValue, productId) {
   return
   `
     <div class='item-quantity-${productId}'>Quantity: ${inputValue} </div>
   `
}