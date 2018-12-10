import Publisher from '@/pages/Page.vue'
import PublisherIndex from '@/pages/publishers/Index.vue'
import PublisherCreate from '@/pages/publishers/Create.vue'

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
