import cart from '../../data/cart-class.js';
import { fetchProducts, loadProducts } from '../../data/products.js';

import { renderOrderSummary } from '../../features/checkout/order-summary-class.js';
import { renderPaymentSummary } from '../../features/checkout/payment-summary-class.js';

describe('Test Suite: Order Summary', () => {
   const product1 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e'
   const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

   beforeAll(done => {
      fetchProducts().then(done)
   })

   beforeEach((done) => {
      done()
      spyOn(localStorage, 'setItem')
      document.querySelector('.js-test-container').innerHTML =
         `
            <div class='checkout-header'></div>
            <div class='js-cart-summary'></div>
            <div class='js-payment-summary'></div>
         `

      spyOn(localStorage, 'getItem').and.callFake(() => {
         return JSON.stringify([{
            quantity: 3, productId: product1, deliveryOptionId: '1'
         },
         {
            quantity: 1, productId: product2, deliveryOptionId: '2'
         }])
      })


      cart.loadFromStorage()

      renderOrderSummary()
      renderPaymentSummary()

      // expect(localStorage.setItem).toHaveBeenCalledTimes(1)

   })

   afterAll(() => {
      document.querySelector('.js-test-container').innerHTML = ''
   })

   it('loads the cart products visually', () => {
      console.log(document.querySelector('.js-payment-summary'));

      expect(document.querySelectorAll(`.js-cart-item`).length)
         .toEqual(2)

      expect(document.querySelector(`.item-quantity-${product1}`).innerText)
         .toBe('Quantity: 3')

      expect(document.querySelector(`.item-quantity-${product2}`).innerText)
         .toBe('Quantity: 1')

   })


   it('deletes the product', () => {

      document.querySelector(`.js-delete-link-${product1}`).click()

      expect(document.querySelectorAll(`.js-cart-item`).length)
         .toEqual(1)

      expect(document.querySelector(`.cart-item-${product1}`)).toBeNull()

      expect(cart.cartItems[0].productId).toEqual(product2)


      expect(
         localStorage.setItem
      ).toHaveBeenCalledWith(
         'cart-class', JSON.stringify([{
            quantity: 1,
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            deliveryOptionId: '2'
         }])
      )
   })

   it('displays correct name', () => {

      expect(
         document.querySelectorAll('.item-name')[0].innerText
      ).toBe(
         'Adults Plain Cotton T-Shirt - 2 Pack'
      )

      expect(
         document.querySelectorAll('.item-price')[0].innerText
      ).toBe(
         '$7.99'
      )
   })

}) 