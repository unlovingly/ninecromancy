import { default as Product } from '@/pages/products/_Product.vue'
import { default as ProductIndex } from '@/pages/products/Index.vue'
import { default as ProductCreate } from '@/pages/products/Create.vue'

export default [
  {
    component: Product,
    path: '/products',
    children: [
      {
        component: ProductIndex,
        name: 'product.indexes',
        path: '',
      },
      {
        component: ProductCreate,
        name: 'product.create',
        path: 'create',
      }
    ]
  }
]