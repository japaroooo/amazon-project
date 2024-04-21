import moneyFormat from '../../script/utils/money.js';


describe('Test Suite: Money format', () => {

   testThis('converts cent into dollar', moneyFormat(2095), '20.95')

   testThis('rounds down to the nearest cent', moneyFormat(2000.4), '20.00')

   testThis('rounds up to the nearest cent', moneyFormat(2000.5), '20.01')

   testThis('works with 0', moneyFormat(0), '0.00')

})


function testThis(testName, callback, expectValue) {
   it(testName, () => {
      expect(callback).toEqual(expectValue)
   })
}