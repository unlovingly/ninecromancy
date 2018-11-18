import { default as Publisher } from '@/pages/publishers/_Publisher.vue'
import { default as PublisherIndex } from '@/pages/publishers/Index.vue'
import { default as PublisherCreate } from '@/pages/publishers/Create.vue'

export default [
  {
    component: Publisher,
    path: '/publishers',
    children: [
      {
        component: PublisherIndex,
        name: 'publisher.index',
        path: ''
      },
      {
        component: PublisherCreate,
        path: 'create',
        name: 'publisher.create'
      }
    ]
  }
]