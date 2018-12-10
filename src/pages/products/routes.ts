import Product from '@/pages/Page.vue'
import ProductIndex from '@/pages/products/Index.vue'
import ProductCreate from '@/pages/products/Create.vue'

export default [
  {
    component: Product,
    path: '/products',
    children: [
      {
        component: ProductIndex,
        name: 'product.index',
        path: ''
      },
      {
        component: ProductCreate,
        name: 'product.create',
        path: 'create'
      }
    ]
  }
]
