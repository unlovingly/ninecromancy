import Vue from 'vue'
import Vuex from 'vuex'
import { publisherModule } from '@/stores/publishers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    publisherModule
  }
})
