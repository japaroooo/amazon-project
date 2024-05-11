import { renderOrderSummary } from './order-summary-class.js';
import { renderPaymentSummary } from './payment-summary-class.js';
import { renderHeader } from './checkout-header-class.js';
import { loadProducts } from '../../data/products.js';

// import '../../data/backend-project.js'
loadProducts(() => {

   renderHeader()
   renderOrderSummary()
   renderPaymentSummary()

})