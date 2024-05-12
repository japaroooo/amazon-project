import { renderOrderSummary } from './order-summary-class.js';
import { renderPaymentSummary } from './payment-summary-class.js';
import { renderHeader } from './checkout-header-class.js';
import { loadProducts, fetchProducts, products } from '../../data/products.js';
import cart from '../../data/cart-class.js'
// import '../../data/backend-project.js'
Promise.allSettled([
   fetchProducts(),
   new Promise((resolve, reject) => {
      cart.loadCart(() => resolve('Cart loads successfully'))
   })
]).then((value1) => {

   renderHeader()
   renderOrderSummary()
   renderPaymentSummary()
})


// new Promise((resolve) => {
//    cart.loadCart(() => resolve())
// }).then(() => {
//    return new Promise((resolve) => {
//       loadProducts(() => resolve())
//    })
// }).then(() => {
//    renderHeader()
//    renderOrderSummary()
//    renderPaymentSummary()
// })