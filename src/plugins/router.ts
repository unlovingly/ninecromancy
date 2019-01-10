import Vue from 'vue'
import Router from 'vue-router'
import Routes from '@/pages/routes'
import CustomerRoutes from '@/pages/customers/routes'
import ProductRoutes from '@/pages/products/routes'
import PublisherRoutes from '@/pages/publishers/routes'
import ShopRoutes from '@/pages/shops/routes'
import SlipRoutes from '@/pages/slips/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...CustomerRoutes,
    ...PublisherRoutes,
    ...ProductRoutes,
    ...Routes,
    ...ShopRoutes,
    ...SlipRoutes
  ]
})

export default router
