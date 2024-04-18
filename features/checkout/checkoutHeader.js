import { updateCartQuantity } from '../../data/cart.mjs';

let html
function renderHeader() {
   html =
      `
      <div>
         <section><a href="/main.html">Amazon</a></section>
         <section class="middle-section">Checkout (${updateCartQuantity()} items)</section>
         <section>Lock</section>
      </div>
      `
   document.querySelector('.checkout-header').innerHTML = html
}

export { renderHeader }