import { Route } from 'vue-router'
import { default as Slip } from '@/pages/Page.vue'
import { default as PurchaseSlipTweeter } from '@/pages/slips/purchase/Index.vue'
import { default as PurchaseSlipCreator } from '@/pages/slips/purchase/Create.vue'
import { default as PurchaseSlipDetail } from '@/pages/slips/purchase/Detail.vue'

export default [
  {
    component: Slip,
    path: 'purchase',
    children: [
      {
        component: PurchaseSlipCreator,
        path: 'storing',
        name: 'slip.purchase.storing'
      },
      {
        component: PurchaseSlipTweeter,
        path: '',
        name: 'slip.purchase.index'
      },
      {
        component: PurchaseSlipDetail,
        path: 'detail/:id',
        props: (route: Route) => ({
          id: route.params.id
        }),
        name: 'slip.purchase.detail'
      },
    ]
  }
]