import { cart, updateCartQuantity } from '../../data/cart.mjs';
import { getDeliveryOption } from '../../data/delivery-options.mjs';
import { getProduct } from '../../data/products.js';
import moneyFormat from '../../script/utils/money.js';

// renderPaymentSummary()

export function renderPaymentSummary() {
   let generateHtml = ''
   let itemsPrice = 0
   let shippingFee = 0

   cart.forEach((cartItem) => {
      const matchingProduct = getProduct(cartItem.productId)
      itemsPrice += (cartItem.quantity * (matchingProduct.priceCents))

      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
      shippingFee += deliveryOption.priceCents
   });

   const totalBeforeTax = shippingFee + itemsPrice
   const estimatedTax = totalBeforeTax * 0.1
   const totalPrice = totalBeforeTax + estimatedTax

   generateHtml +=
      `
         <div class="payment-summary-row">
            <b class='payment-title'>Order Summary</b>
         </div>

         <div class='payment-summary-row'>
            <div>Items (${updateCartQuantity()}):</div>
            <div>$ ${moneyFormat(itemsPrice)}</div>
         </div>

         <div class='payment-summary-row'>
            <div>Shipping & handling:</div>
            <div class='shipping-price'> ${shippingFee ? '$' + moneyFormat(shippingFee) : 'Free'}</div> 
         </div>

         <div class='payment-summary-row'>
            <div>Total before tax:</div>
            <span>$ </span><div class='total-before-tax'>${moneyFormat(totalBeforeTax)}</div>
         </div>

         <div class='payment-summary-row'>
            <div>Estimated tax:</div>
            <span>$ </span><div class='estimated-tax'>${moneyFormat(estimatedTax)}</div>
         </div>

         <div class='payment-summary-row'>
            <div><b>Total Price:</b></div>
            <span>$ </span><div class='total-price'><b>${moneyFormat(totalPrice)} </b></div>
         </div>

         <button class='place-order-button'>Place Order</button>       
         `

   document.querySelector('.js-payment-summary').innerHTML = generateHtml
}