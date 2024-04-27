import { renderOrderSummary } from './order-summary.js';
import { renderPaymentSummary } from './payment-summary.js';
import { renderHeader } from './checkoutHeader.js';

// import '../../data/cart-class.js'


renderHeader()
renderOrderSummary()
renderPaymentSummary()

/**
 * ! Sample code is below, not included in project
 */

// let monthAfterToday = dayjs().add(2, 'month').format('MMMM DD')
// console.log(monthAfterToday);

// let dayOfWeek = dayjs().format('dddd')
// console.log(dayOfWeek);

