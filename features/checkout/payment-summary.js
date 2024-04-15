import { cart } from '../../data/cart.mjs';
import { getDeliveryOption } from '../../data/delivery-options.mjs';
import { getProduct } from '../../data/products.js';
import moneyFormat from '../../script/utils/money-format.js';

const paymentSummary = document.querySelector('.payment-summary')

function renderPaymentSummary() {
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

   let html =
      `
         <div class="payment-summary-row">
            <b class='payment-title'>Order Summary</b>
         </div>

         <div class='payment-summary-row'>
            <div>Items:</div>
            <div>$ ${moneyFormat(itemsPrice)}</div>
         </div>

         <div class='payment-summary-row'>
            <div>Shipping & handling:</div>
            <div class='shipping-price'> ${shippingFee ? '$' + moneyFormat(shippingFee) : 'Free'}</div> 
         </div>

         <div class='payment-summary-row'>
            <div>Total before tax:</div>
            <div>$ ${moneyFormat(totalBeforeTax)}</div>
         </div>

         <div class='payment-summary-row'>
            <div>Estimated tax:</div>
            <div class='estimated-tax'>$ ${moneyFormat(estimatedTax)}</div>
         </div>

         <div class='payment-summary-row'>
            <div><b>Total Price:</b></div>
            <div><b>$ ${moneyFormat(totalPrice)} </b></div>
         </div>

         <button class='place-order-button'>Place Order</button>       
         `

   // document.querySelector('.items-price').innerHTML = `$${moneyFormat(itemsPrice)}`
   // document.querySelector('.shipping-price').innerHTML = shippingFee ? `$${moneyFormat(shippingFee)}` : 'Free'
   // document.querySelector('.total-tax').innerHTML = `$${moneyFormat(totalBeforeTax)}`
   // document.querySelector('.estimated-tax').innerHTML = `$${moneyFormat(estimatedTax)}`
   // document.querySelector('.total-price').innerHTML = `$${moneyFormat(totalPrice)}`

   paymentSummary.innerHTML = html
}

renderPaymentSummary()

export { renderPaymentSummary }