import { Route } from 'vue-router'
import { default as Slip } from '@/pages/Page.vue'
import { default as PurchaseSlipRoutes } from '@/pages/slips/purchase/routes'
import { default as SalesSlipRoutes } from '@/pages/slips/sales/routes'

export default [
  {
    component: Slip,
    path: '/slips',
    children: [
      ...PurchaseSlipRoutes,
      ...SalesSlipRoutes,
    ]
  }
]