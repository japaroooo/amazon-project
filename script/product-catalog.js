import { products } from '../data/products.js';
import { cart } from './cart.js';

let productHTML = '';

products.forEach((product) => {
  let html = `
   <div class='product-container' data-product-id='${product.id}'>
         <div class='product-name'>${product.name}</div>
         <div class='product-rating-container'> 
         <div> Star: ${product.rating.stars} </div>
         <div> Rating: ${product.rating.count} </div>
         </div>
         <div class='product-price'>$${(product.priceCents / 100).toFixed(
           2
         )}</div>
        
         <select class='js-quantity-selector'>
            <option selected value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
         </select>
         <button class='add-cart' data-product-name='${
           product.name
         }' data-product-id='${product.id}'>Add to Cart</button>
   </div>
         `;

  productHTML += html;
});

document.querySelector('.products-grid').innerHTML = productHTML;

// document.querySelectorAll('.js-quantity-selector').forEach((selector) => {
//   selector.addEventListener('change', () => {

//   });
// });

document.querySelectorAll('.add-cart').forEach((button, index) => {
  button.addEventListener('click', () => {
    const productName = button.dataset.productName;
    const productId = button.dataset.productId;

    let matchingProduct;

    cart.forEach((product) => {
      if (product.productId === productId) {
        matchingProduct = product;
      }
    });

    if (matchingProduct) {
      matchingProduct.quantity += 1;
    } else {
      cart.push({ productName, quantity: 1, productId });
    }

    console.log(cart);
    document.querySelector('.js-cart-quantity').innerHTML = cart.length;
  });
});
