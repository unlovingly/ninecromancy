import { default as Shop } from '@/pages/Page.vue'
import { default as ShopIndex } from '@/pages/shops/Index.vue'
import { default as ShopCreate } from '@/pages/shops/Create.vue'
import { default as ShopStocks } from '@/pages/shops/Stocks.vue'

export default [
  {
    component: Shop,
    path: '/shops',
    children: [
      {
        component: ShopIndex,
        name: 'shop.index',
        path: ''
      },
      {
        component: ShopStocks,
        name: 'shop.stocks',
        path: 'stocks'
      },
      {
        component: ShopCreate,
        name: 'shop.create',
        path: 'create'
      }
    ]
  }
]