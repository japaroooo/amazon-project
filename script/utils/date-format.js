import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

export function currentDate(dayToAdd) {
   let today = dayjs()
   let deliveryDate = today.add(dayToAdd, 'day')
   let dateFormat = deliveryDate.format('dddd, MMM DD')


   return dateFormat
}