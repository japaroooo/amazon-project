import { cart, addToCart, loadFromStorage, calculateCartQuantity, removeFromCart, updateDeliveryOption } from '../../data/cart.mjs';


describe('Test Suite: Add to cart', () => {

   const productId1 = '58b4fc92-e98c-42aa-8c55-b6b79996769a'
   const productId2 = 'aad29d11-ea98-41ee-9285-b916638cac4a'

   const products = JSON.stringify([{
      quantity: 3, productId: productId1, deliveryOptionId: '1'
   },
   {
      quantity: 1, productId: productId2, deliveryOptionId: '2'
   }])

   beforeEach(() => {
      spyOn(localStorage, 'setItem')

      spyOn(localStorage, 'getItem').and.callFake(() => {
         return products
      })

      loadFromStorage()

      addToCart(1, 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6')

      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
   })


   it('Add new products from the catalog', () => {

      expect(cart.length).toEqual(3)
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
         quantity: 3, productId: productId1, deliveryOptionId: '1'
      },
      {
         quantity: 1, productId: productId2, deliveryOptionId: '2'
      },
      {
         quantity: 1, productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', deliveryOptionId: '1'
      }]))
   })

   it('Updates the quantity of the same product', () => {


      calculateCartQuantity(2, 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
      expect(cart.length).toEqual(3)
      expect(cart[2].quantity).toEqual(2)
      expect(cart[2].productId).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
         quantity: 3, productId: productId1, deliveryOptionId: '1'
      },
      {
         quantity: 1, productId: productId2, deliveryOptionId: '2'
      },
      {
         quantity: 1, productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', deliveryOptionId: '1'
      }]))

   })

   it('Remove from cart when click', () => {

      removeFromCart(productId2)
      expect(cart.length).toEqual(2)
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
         [{
            quantity: 3, productId: productId1, deliveryOptionId: '1'
         },
         {
            quantity: 1, productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', deliveryOptionId: '1'
         }]
      ))
   })

   it('Remove from cart when not click', () => {
      removeFromCart('77919bbe-0e56-475b-adde-4f24dfed3a04')

      expect(cart.length).toEqual(3)
   })


   it('updates the delivery option', () => {

      updateDeliveryOption(productId1, 3)


      expect(cart[0].deliveryOptionId).toBe(3)
      expect(cart[0].productId).toBe(productId1)
      expect(cart[0].quantity).toEqual(3)

      expect(cart.length).toEqual(3)
   })
})
