import { cart, addToCart, loadFromStorage } from '../../data/cart.mjs';

describe('Test Suite: Add to cart', () => {

   it('Add new products from the catalog', () => {
      spyOn(localStorage, 'setItem')

      spyOn(localStorage, 'getItem').and.callFake(() => {
         return JSON.stringify([])
      })

      loadFromStorage()

      console.log(cart);

      addToCart(1, 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
      expect(cart.length).toEqual(1)
      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart))

   })

   it('Updates the quantity of the same product', () => {
      spyOn(localStorage, 'setItem')

      spyOn(localStorage, 'getItem').and.callFake(() => {
         return JSON.stringify([{
            quantity: 1,
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            deliveryOptionId: 1
         }])
      })

      loadFromStorage()

      // calculateCartQuantity(2, 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
      addToCart(1, 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
      expect(cart[0].quantity).toEqual(2)
   })

})