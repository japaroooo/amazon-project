export let cart = JSON.parse(localStorage.getItem('cart')) || [];


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(itemQuantity, productId) {
  let matchingProduct = '';

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

  saveToStorage()
}

export function updateCartQuantity() {
  let cartQuantity = 0

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

  cart = newCart

  saveToStorage()
}
