import Shop from '@/pages/Page.vue'
import ShopIndex from '@/pages/shops/Index.vue'
import ShopCreate from '@/pages/shops/Create.vue'
import ShopStocks from '@/pages/shops/Stocks.vue'

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
