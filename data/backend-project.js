import moneyFormat from '../script/utils/money.js';
import order from '../data/order.js';

async function placeOrder(data) {
   try {

      const response = await fetch('https://supersimplebackend.dev/orders', {
         method: 'POST',
         priority: 'high',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            cart: data
         })
      })

      const place_order = await response.json()
      order.addOrder(place_order)

      window.location.href = '/features/orders/orders.html'
   } catch (error) {
      console.log(error);
      return
   }
}

export { placeOrder }   