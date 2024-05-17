
class Order {
   orders = JSON.parse(localStorage.getItem('orders')) || []

   addOrder(order) {
      this.orders.unshift(order)
      this.saveToStorage()
   }

   saveToStorage() {
      try {
         localStorage.setItem('orders', JSON.stringify(this.orders))
         console.log('Order save in Storage');
      } catch (error) {
         console.log(error);
         return
      }
   }

   getOrder(orderId) {
      let matchingOrder = this.orders.reduce((acc, order) => {
         acc[order.id] = order
         return acc
      }, {})

      console.log(matchingOrder);
      return matchingOrder[orderId]
   }
}
const order = new Order()
export default order


