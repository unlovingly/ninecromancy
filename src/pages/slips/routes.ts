import { default as Slip } from '@/pages/Page.vue'
import { default as PurchaseSlipCreator } from '@/pages/slips/PurchaseSlip.vue'
import { default as SalesSlipCreator } from '@/pages/slips/SalesSlip.vue'

export default [
  {
    component: Slip,
    path: '/slips',
    children: [
      {
        component: PurchaseSlipCreator,
        path: 'create',
        name: 'slip.create'
      },
      {
        component: SalesSlipCreator,
        path: '',
        name: 'slip.index'
      },
    ]
  }
]