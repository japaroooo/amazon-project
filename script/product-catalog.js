import { products } from '../data/products.js';

let productHTML = '';

products.forEach((product) => {
  let html = `
   <div class='product-container' data-product-id='${product.id}'>
         <div class='product-name'>${product.name}</div>
         <div class='product-rating-container'> 
         <div> Star: ${product.rating.stars} </div>
         <div> Rating: ${product.rating.count} </div>
         </div>
         <div class='product-price'>$${defaultPrice(product.priceCents)}</div>
        
         <select class='js-quantity-selector'>
            <option selected value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
         </select>
         <button class='add-cart'>Add to Cart</button>
   </div>
         `;

  productHTML += html;
});

document.querySelector('.products-grid').innerHTML = productHTML;

function defaultPrice(price) {
  return (Math.floor(price) / 100).toFixed(2);
}
