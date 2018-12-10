import Slip from '@/pages/Page.vue'
import PurchaseSlipRoutes from '@/pages/slips/purchase/routes'
import SalesSlipRoutes from '@/pages/slips/sales/routes'

export default [
  {
    component: Slip,
    path: '/slips',
    children: [...PurchaseSlipRoutes, ...SalesSlipRoutes]
  }
]
