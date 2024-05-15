

document.querySelector(".header").innerHTML =
   `
      <section><a href="/main.html" class="amazon-link">Amazon</a></section>
      <section class="middle-section">
         <input type="text" placeholder="Search" class="search-input" />🔎
      </section>
      <section class="right-section">
         <a href="/orders.html" class="order-link"
            ><span>Returns</span><span>& Orders</span></a
         >
         <a href="/checkout.html" class="cart-link">
            <span class="js-cart-quantity"></span><span>Cart</span></a
         >
      </section>
   `