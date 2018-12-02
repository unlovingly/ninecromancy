import { Route } from 'vue-router'
import { default as Slip } from '@/pages/Page.vue'
import { default as SalesSlipCreate } from '@/pages/slips/sales/Create.vue'
import { default as SalesSlipIndex } from '@/pages/slips/sales/Index.vue'
import { default as SalesSlipDetail } from '@/pages/slips/sales/Detail.vue'

export default [
  {
    component: Slip,
    path: 'sales',
    children: [
      {
        component: SalesSlipCreate,
        path: 'sell',
        name: 'slip.sales.sell'
      },
      {
        component: SalesSlipIndex,
        path: '',
        name: 'slip.sales.index'
      },
      {
        component: SalesSlipDetail,
        path: 'detail/:id',
        props: (route: Route) => ({
          id: route.params.id
        }),
        name: 'slip.sales.detail'
      },
    ]
  }
]

