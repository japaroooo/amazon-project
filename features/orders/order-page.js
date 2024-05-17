import order from '../../data/order.js';
import { fetchProducts, getProduct, products as fetchProductsResult } from '../../data/products.js';
import { changeDateFormat } from '../../script/utils/date-format.js';
import moneyFormat from '../../script/utils/money.js';

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
                  <div><span>Total Price</span><h3>$${totalPrice}</h3></div>
                  <div><span>Time Ordered</span><h3>${changeDateFormat(loadOrder.orderTime)}</h3></div>
                  <div><span>Order ID</span><h3>${loadOrder.id}</h3></div>
               </section>
                  
               <section class='order-products'>
                  <div class='products-list'>
                     ${displayProducts(loadOrder.products)}
                  </div>
                  <div>
                     <a href="/features/tracking/tracking.html?orderId=${loadOrder.id}">
                        <button class='track-package primary-button'>
                           Track Order
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
                  </div>
            `
      })
      return html
   }

}
