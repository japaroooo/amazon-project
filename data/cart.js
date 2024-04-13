export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  quantity: 3, productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e', deliveryOptionId: '1'
}, {
  quantity: 1, productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', deliveryOptionId: '2'
}];

let cartList = document.querySelector('.cart-summary')

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
    cart.push({ quantity: +itemQuantity.value, productId, deliveryOptionId: '1' });
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

export function updateDeliveryOption(productId, deliveryOptId) {
  let matchingProduct = ''

  cart.forEach((product) => {
    if (product.productId === productId) {
      matchingProduct = product;
    }
  });

  matchingProduct.deliveryOptionId = deliveryOptId

  saveToStorage()
  // document.querySelector(`.js-delivery-item-${productId}`).innerHTML = matchingProduct.
}