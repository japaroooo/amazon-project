import moneyFormat from '../money-format.js';


console.group('Money format test');
testFunction(moneyFormat(2000.5), '20.01', 'Rounds up to the nearest cents?')
testFunction(moneyFormat(2000.4), '20.00', 'Rounds down to the nearest cents?')
testFunction(moneyFormat(2095), '20.95', 'It converts cents to dollars?')
testFunction(moneyFormat(0), '0.00', 'It works with 0?')
console.groupEnd('Money format test');



function testFunction(funcToTest = new Function(), expectedValue, message) {
   if (funcToTest === expectedValue) {
      console.log('PASSED');
   }
   else {
      console.error('FAILED');
   }
}

