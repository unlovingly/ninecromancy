import Vue from 'vue'
import Router from 'vue-router'
import { default as ProductRoutes } from '@/pages/products/routes'
import { default as PublisherRoutes } from '@/pages/publishers/routes'
import { default as SlipRoutes } from '@/pages/slips/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...PublisherRoutes,
    ...ProductRoutes,
    ...SlipRoutes,
  ]
});

export default router