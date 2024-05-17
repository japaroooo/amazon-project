
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
   const deliveryOption = deliveryOptions.reduce((acc, curr) => {
      acc[curr.id] = curr
      return acc
   }, {})

   return deliveryOption[deliveryOptionId]
}

export { deliveryOptions, getDeliveryOption }