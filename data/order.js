
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
      let matchingOrder

      this.orders.forEach(order => {
         if (order.id === orderId) {
            matchingOrder = order
         }
      })

      return matchingOrder
   }
}
const order = new Order()
export default order


