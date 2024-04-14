import { cart } from '../../data/cart.mjs';
import { deliveryOptions, getDeliveryOption } from '../../data/delivery-options.mjs';
import { products, getProduct } from '../../data/products.js';
import moneyFormat from '../../script/utils/money-format.js';


function renderPaymentSummary() {
   let itemsPrice = 0
   let shippingFee = 0

   cart.forEach((cartItem) => {
      const matchingProduct = getProduct(cartItem.productId)
      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)

      itemsPrice += (cartItem.quantity * (matchingProduct.priceCents))
      shippingFee += deliveryOption.priceCents
   });

   document.querySelector('.items-price').innerHTML = `$${moneyFormat(itemsPrice)}`
   document.querySelector('.shipping-price').innerHTML = `$${moneyFormat(shippingFee)}`
}

renderPaymentSummary()

export { renderPaymentSummary }