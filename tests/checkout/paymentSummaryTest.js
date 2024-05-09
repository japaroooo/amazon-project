import { renderPaymentSummary } from '../../features/checkout/payment-summary-class.js'


describe('Test Suite: Payment Summary', () => {
   beforeEach(() => {
      document.querySelector('.js-test-container').innerHTML =
         `
         <div class='js-payment-summary'></div>
         `

      renderPaymentSummary()
   }, 3)

   afterAll(() => {
      document.querySelector('.js-test-container').innerHTML = ''
   })

   it('Payment Summary data display', () => {
      const totalBeforeTax = Number(document.querySelector('.total-before-tax').innerText)
      const estimatedTax = Number(document.querySelector('.estimated-tax').innerText)
      const totalPrice = document.querySelector('.total-price')

      console.log(totalBeforeTax, estimatedTax, totalPrice);

      console.log(typeof totalBeforeTax);
      console.log(typeof estimatedTax);

      expect(totalPrice.innerText).toBe((estimatedTax + totalBeforeTax).toFixed(2))
      expect(estimatedTax).toEqual(Number((totalBeforeTax * 0.1).toFixed(2)))

   })
})