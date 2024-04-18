
const deliveryOptions = [
   {
      id: '1',
      priceCents: 0,
      deliveryDays: 7,

   },
   {
      id: '2',
      priceCents: 499,
      deliveryDays: 3,

   },
   {
      id: '3',
      priceCents: 899,
      deliveryDays: 1,

   }
]



function getDeliveryOption(deliveryOptionId) {
   let deliveryOption

   deliveryOptions.forEach(delivery => {
      if (delivery.id === deliveryOptionId) {

         deliveryOption = delivery
      }
   })

   return deliveryOption
}

export { deliveryOptions, getDeliveryOption }