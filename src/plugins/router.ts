import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/plugins/i18n'
import { default as PublisherRoutes } from '@/pages/publishers/routes'
import { default as ProductRoutes } from '@/pages/products/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...PublisherRoutes,
    ...ProductRoutes,
  ]
});

export default router