import Vue from 'vue'
import Vuex from 'vuex'
import { customerModule } from '@/stores/customers'
import { shopModule } from '@/stores/shops'
import { slipModule } from '@/stores/slips'
import { stockModule } from '@/stores/stocks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    customerModule,
    shopModule,
    slipModule,
    stockModule,
  }
})
