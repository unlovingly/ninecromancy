import { default as Product } from '@/pages/products/_Product.vue'
import { default as ProductIndex } from '@/pages/products/Index.vue'

export default [
  {
    component: Product,
    path: '/products',
    children: [
      {
        component: ProductIndex,
        name: 'product.indexes',
        path: ''
      },
      {
        path: '/detail/:id',
        name: 'product.detail'
      }
    ]
  }
]