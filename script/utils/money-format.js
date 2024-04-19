function moneyFormat(value = '') {
   value = Math.round(value)
   return (value * 0.01).toFixed(2)
}

export default moneyFormat