export const cart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  },
  {
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 3,
  },
];

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
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += +cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
