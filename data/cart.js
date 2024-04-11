export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(itemQuantity, productId) {
  let matchingProduct;

  cart.forEach((product) => {
    if (product.productId === productId) {
      matchingProduct = product;
    }
  });

  if (matchingProduct) {
    matchingProduct.quantity += +itemQuantity.value;
  } else {
    cart.push({ quantity: +itemQuantity.value, productId });
  }

  localStorage.setItem('cart', JSON.stringify(cart))

  console.log(`Cart:`, cart);
  console.log(`Local Storage:`, localStorage);
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += +cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function removeFromCart(productId) {
  let newCart = []

  cart.forEach(item => {
    if (item.productId !== productId) {
      newCart.push(item)
    }
  })

  localStorage.setItem('cart', JSON.stringify(newCart))
  console.log(`Local Storage:`, localStorage);
}
