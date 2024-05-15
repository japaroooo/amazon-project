import order from '../data/order.js';
import { fetchProducts, getProduct, products as fetchProductsResult } from '../data/products.js';
import moneyFormat from './utils/money.js';

renderOrderPage()

async function renderOrderPage() {
   let generateHtml = ''
   await fetchProducts()

   order.orders.forEach((loadOrder) => {
      const totalPrice = moneyFormat(loadOrder.totalCostCents)
      generateHtml +=
         `
            <div class='card order-box'>        
               <section class='order-info'>
                  <div><span>Total Price</span><h3>${totalPrice}</h3></div>
                  <div><span>Order ID</span><h3>${loadOrder.id}</h3></div>
                  <div><span>Time Ordered</span><h3>${loadOrder.orderTime}</h3></div>
               </section>
                  
               <section class='order-products-list'>
                  <div>
                     ${displayProducts(loadOrder.products)}
                  </div>
                  <div>
                     <a href="tracking.html?orderId=${loadOrder.id}">
                        <button class='track-package primary-button'>
                           Track package
                        </button>
                     </a>
                  </div>
               </section>
            </div>
               
         `
   })


   document.querySelector('.order-content').innerHTML = generateHtml

   function displayProducts(products) {
      let html = ''
      products.forEach((product) => {
         const { productId, quantity, estimatedDeliveryTime } = product
         const productName = getProduct(productId)
         html +=
            `  
               <div>
                  <div> Product Name: <b>${productName.name}</b> </div>
                  <div> Quantity: <b>${quantity}</b> </div>
                  <div> Delivery Time(ETA): <b>${estimatedDeliveryTime}</b> </div>
               </div>
            `
      })
      return html
   }

}
