import { renderOrderSummary } from './order-summary-class.js';
import { renderPaymentSummary } from './payment-summary-class.js';
import { renderHeader } from './checkout-header-class.js';
import { fetchProducts } from '../../data/products.js';
import cart from '../../data/cart-class.js'
import '../../data/backend-project.js'

async function loadPage() {
   try {

      console.log('Page loaded');

      await Promise.allSettled([
         fetchProducts(),
         cart.fetchCart()
      ])

      // await new Promise((resolve) => {
      //    cart.loadCart(() => resolve())
      // })

      renderHeader()
      renderOrderSummary()
      renderPaymentSummary()
      console.log('Checkout loaded');
   } catch (error) {
      console.log(error);
   }
}

loadPage()


// Promise.allSettled([
//    fetchProducts(),
//    new Promise((resolve, reject) => {
//       cart.loadCart(() => resolve('Cart loads successfully'))
//    })
// ]).then((value1) => {

//    renderHeader()
//    renderOrderSummary()
//    renderPaymentSummary()
// })


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