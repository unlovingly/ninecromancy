import { Route } from 'vue-router'
import { default as Slip } from '@/pages/Page.vue'
import { default as PurchaseSlipTweeter } from '@/pages/slips/purchase/Index.vue'
import { default as PurchaseSlipCreator } from '@/pages/slips/purchase/Create.vue'
import { default as PurchaseSlipDetail } from '@/pages/slips/purchase/Detail.vue'
import { default as SalesSlipCreator } from '@/pages/slips/sales/Create.vue'

export default [
  {
    component: Slip,
    path: '/slips',
    children: [
      {
        component: PurchaseSlipCreator,
        path: 'storing',
        name: 'slip.storing'
      },
      {
        component: PurchaseSlipTweeter,
        path: '',
        name: 'slip.index'
      },
      {
        component: PurchaseSlipDetail,
        path: 'detail/:id',
        props: (route: Route) => ({
          id: route.params.id
        }),
        name: 'slip.detail'
      },
      {
        component: SalesSlipCreator,
        path: 'sell',
        name: 'slip.sell'
      },
    ]
  }
]