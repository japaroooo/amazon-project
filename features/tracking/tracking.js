import order from '../../data/order.js'
import { fetchProducts, getProduct } from '../../data/products.js'
import { changeDateFormat } from '../../script/utils/date-format.js'

const url = new URL(window.location.href)
const urlOrderId = url.searchParams.get('orderId')
const currOrder = order.getOrder(urlOrderId)

async function renderTrackingPage() {
   await fetchProducts()
   let generateHtml = ''

   generateHtml +=
      `
         <main class='tracking-wrapper'>
            <section>Ordered on ${changeDateFormat(currOrder.orderTime)}</section>
            <section class='item-container'>
               ${productsList(currOrder.products)}
            </section>
         </main>
      `

   document.querySelector('.tracking-order-wrapper').innerHTML = generateHtml

   function productsList(products) {
      let productHTML = ''
      currOrder.products.forEach((product) => {
         const currentProduct = getProduct(product.productId)
         console.log(currentProduct);
         productHTML +=
            `
               <div class='item'>
                  <div><h3 >${currentProduct.name}</h3></div>
                  <div>Quantity: ${product.quantity}</div>
                  <div> Delivery Time(ETA): <b>${changeDateFormat(product.estimatedDeliveryTime)}</b> </div>
                  <button class='primary-button tracking-button'>Track Package</button>
               </div>
            `
      })
      return productHTML
   }
}


renderTrackingPage()

console.log(currOrder);