class Cart {

   cartItems = []
   #localStorageKey

   constructor(localStorageKey) {
      this.#localStorageKey = localStorageKey
      this.loadFromStorage()
   }

   loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))

      if (!this.cartItems) {
         this.cartItems = [{
            quantity: 3, productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e', deliveryOptionId: '1'
         },
         {
            quantity: 1, productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', deliveryOptionId: '2'
         }];
      }

   }

   saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
   }

   addToCart(itemQuantity = 1, productId) {
      let matchingProduct;

      this.cartItems.forEach((product) => {
         if (product.productId === productId) {
            matchingProduct = product;
         }
      });

      if (matchingProduct) {
         matchingProduct.quantity += itemQuantity;
      } else {
         this.cartItems.push({ quantity: itemQuantity, productId, deliveryOptionId: '1' });
      }

      this.saveToStorage()
   }

   updateCartQuantity() {
      return this.cartItems.reduce((currentSum, item) => item.quantity + currentSum, 0)
   }

   calculateCartQuantity(inputValue, productId) {

      this.cartItems.forEach(cartItem => {
         if (productId === cartItem.productId) {
            cartItem.quantity = inputValue
         }
      })

      this.saveToStorage()
   }

   removeFromCart(productId) {
      let newCart = []

      this.cartItems.forEach(item => {
         if (item.productId !== productId) {
            newCart.push(item)
         }
      })

      this.cartItems = newCart
      this.saveToStorage()
   }

   updateDeliveryOption(productId, deliveryOptId) {
      let matchingProduct = ''


      this.cartItems.forEach((product) => {
         if (product.productId === productId) {
            matchingProduct = product;
         }
      });

      if (!matchingProduct) return

      matchingProduct.deliveryOptionId = deliveryOptId
      this.saveToStorage()
   }
}

let cart = new Cart('cart-class')

export default cart