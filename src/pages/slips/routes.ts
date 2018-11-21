import { default as Slip } from '@/pages/Page.vue'
import { default as PurchaseSlipTweeter } from '@/pages/slips/purchase/Index.vue'
import { default as PurchaseSlipCreator } from '@/pages/slips/purchase/Create.vue'
import { default as PurchaseSlipDetail } from '@/pages/slips/purchase/Detail.vue'

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
        component: PurchaseSlipTweeter,
        path: '',
        name: 'slip.index'
      },
      {
        component: PurchaseSlipDetail,
        path: ':id',
        name: 'slip.detail'
      },
    ]
  }
]