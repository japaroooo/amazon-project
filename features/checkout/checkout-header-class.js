import cart from '../../data/cart-class.js';

renderHeader()

export function renderHeader() {
   let html =
      `
      <div>
         <section><a href="/main.html">Amazon</a></section>
         <section class="middle-section">Checkout (${cart.updateCartQuantity()} items)</section>
         <section>Lock</section>
      </div>
      `
   document.querySelector('.checkout-header').innerHTML = html
}


