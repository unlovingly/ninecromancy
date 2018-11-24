import Vue from 'vue'
import Vuex from 'vuex'
import { productModule } from '@/stores/products'
import { publisherModule } from '@/stores/publishers'
import { shopModule } from '@/stores/shops'
import { slipModule } from '@/stores/slips'
import { slipDetailModule } from '@/stores/slip/purchase'
import { stockModule } from '@/stores/stocks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    productModule,
    publisherModule,
    shopModule,
    slipModule,
    slipDetailModule,
    stockModule,
  }
})
