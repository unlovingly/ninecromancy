import Vue from 'vue'
import Router from 'vue-router'
import { default as PublisherRoutes } from '@/pages/publishers/routes'
import { default as ProductRoutes } from '@/pages/products/routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...PublisherRoutes,
    ...ProductRoutes,
  ]
})
