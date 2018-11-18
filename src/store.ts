import Vue from 'vue'
import Vuex from 'vuex'
import { publisherModule } from '@/stores/publishers'
import { productModule } from '@/stores/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    productModule,
    publisherModule,
  }
})
