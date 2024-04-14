import { updateCartQuantity } from '../../data/cart.mjs';
import { renderOrderSummary } from './order-summary.js';
import { renderPaymentSummary } from './payment-summary.js';

let cartQuantity = updateCartQuantity()
document.querySelector('.middle-section').innerHTML = `Checkout (${cartQuantity} items)`

renderOrderSummary()
renderPaymentSummary()