import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
dayjs.extend(window.dayjs_plugin_weekday)

function isWeekend(date) {
   const format = date.format('dddd')
   return format === 'Saturday' || format === 'Sunday'
}

function calculateDeliveryDate(deliveryDate) {

   let remainingDays = deliveryDate
   let dateToday = dayjs()

   while (remainingDays > 0) {
      dateToday = dateToday.add(1, 'day')

      if (!isWeekend(dateToday)) {
         remainingDays--
      }
   }

   const dateString = dateToday.format('dddd, MMMM D')

   return { dateString, dateToday }
}

function changeDateFormat(date) {
   return dayjs(date).format('MMM DD YYYY')
}

export { calculateDeliveryDate, isWeekend, changeDateFormat }