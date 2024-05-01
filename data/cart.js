let cart = JSON.parse(localStorage.getItem('cart'))

if (!cart) {
  localStorage.removeItem('cart')
  cart = [{
    quantity: 3,
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    deliveryOptionId: '1'
  }, {
    quantity: 1,
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    deliveryOptionId: '1'
  }];
}


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
  console.log(localStorage);
}

function addToCart(itemQuantity, productId) {
  let matchingProduct = '';

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  });

  if (matchingProduct) {
    matchingProduct.quantity += itemQuantity;
  } else {
    cart.push({ quantity: itemQuantity, productId, deliveryOptionId: '1' });
  }

  saveToStorage()
}

function updateCartQuantity() {
  let cartQuantity = 0

  cart.forEach((cartItem) => {
    cartQuantity += +cartItem.quantity;
  });

  return cartQuantity
}

function calculateCartQuantity(inputValue, productId) {
  const newQuantity = inputValue

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      cartItem.quantity = newQuantity
    }
  })

  saveToStorage()
}

function removeFromCart(productId) {
  let newCart = []

  cart.forEach(item => {
    if (item.productId !== productId) {
      newCart.push(item)
    }
  })
  cart = newCart
  saveToStorage()
}

function updateDeliveryOption(productId, deliveryOptId) {
  let matchingProduct = ''


  cart.forEach((product) => {
    if (product.productId === productId) {
      matchingProduct = product;
    }
  });

  if (!matchingProduct) return

  matchingProduct.deliveryOptionId = deliveryOptId
  saveToStorage()
}

export { cart, addToCart, updateCartQuantity, updateDeliveryOption, removeFromCart, calculateCartQuantity }