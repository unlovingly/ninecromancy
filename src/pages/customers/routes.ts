import { default as Customer } from '@/pages/Page.vue'
import { default as CustomerIndex } from '@/pages/customers/Index.vue'
import { default as CustomerCreate } from '@/pages/customers/Create.vue'

export default [
  {
    component: Customer,
    path: '/customers',
    children: [
      {
        component: CustomerIndex,
        name: 'customer.index',
        path: ''
      },
      {
        component: CustomerCreate,
        path: 'create',
        name: 'customer.create'
      }
    ]
  }
]