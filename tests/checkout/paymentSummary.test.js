import { renderPaymentSummary } from '../../features/checkout/payment-summary.js'
import moneyFormat from '../../script/utils/money.js'


describe('Test Suite: Payment Summary', () => {

   beforeEach(() => {
      document.querySelector('.js-test-container').innerHTML =
         `
         <div class='js-payment-summary'></div>
      `
      renderPaymentSummary()
   })


   it('Display total prices precisely', () => {

      const totalPrice = +(document.querySelector('.total-before-tax').innerText) + +(document.querySelector('.estimated-tax').innerText)

      expect(document.querySelector('.total-price').innerText).toEqual(totalPrice.toFixed(2))

   })
})