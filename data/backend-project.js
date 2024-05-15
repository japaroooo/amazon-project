import moneyFormat from '../script/utils/money.js';
import order from '../data/order.js';

/** @type {Headers} */
const Headers = {
   "Content-Type": 'application/json',
}

async function placeOrder(data) {
   try {

      const response = await fetch('https://supersimplebackend.dev/orders', {
         method: 'POST',
         priority: 'high',
         headers: Headers,
         body: JSON.stringify({
            cart: data
         })
      })

      const place_order = await response.json()
      console.log(place_order);
      order.addOrder(place_order)

      window.location.href = '/orders.html'
   } catch (error) {
      console.log(error);
      return
   }
}

export { placeOrder }   