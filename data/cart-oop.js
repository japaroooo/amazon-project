const cart = {

   cartItems: undefined,

   loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem('cart-oop'))

      if (!this.cartItems) {
         this.cartItems = [{
            quantity: 3, productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e', deliveryOptionId: '1'
         },

         {
            quantity: 1, productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', deliveryOptionId: '2'
         }];
      }

   },

   saveToStorage() {
      localStorage.setItem('cart-oop', JSON.stringify(this.cartItems))
   },

   addToCart(itemQuantity = 1, productId) {
      let matchingProduct = '';

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
   },

   /**
    * 
    * @returns cartQuantity
    * * for View only
    */
   updateCartQuantity() {
      let cartQuantity = 0

      this.cartItems.forEach((cartItem) => {
         cartQuantity += +cartItem.quantity;
      });

      return cartQuantity
   },

   calculateCartQuantity(inputValue, productId) {
      const newQuantity = inputValue

      this.cartItems.forEach(cartItem => {
         if (productId === cartItem.productId) {
            cartItem.quantity = newQuantity
         }
      })

      this.saveToStorage()
   },

   removeFromCart(productId) {
      let newCart = []

      this.cartItems.forEach(item => {
         if (item.productId !== productId) {
            newCart.push(item)
         }
      })

      this.cartItems = newCart
      this.saveToStorage()
   },

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

cart.loadFromStorage()
