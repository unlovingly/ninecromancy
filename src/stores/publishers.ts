import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Publisher } from '@/models/Publisher'
import store from '@/plugins/store'

const api = 'http://localhost:9000/publishers'

interface State {
  [key: string]: Publisher
}

@Module({ dynamic: true, name: 'publisherModule', namespaced: true, store })
export default class Publishers extends VuexModule {
  publishers: State = {}

  @Action({ commit: 'storeAll' })
  async retrieve () {
    const result = await axios.get(api)

    return result.data
  }

  @Action({ commit: 'storeAll' })
  async retrieveByKeys (keys: Array<string>) {
    const result = await axios.get(`${api}/retrieveBy`, {
      params: keys,
      paramsSerializer: (k) =>
        qs.stringify({ publisherId: k }, { arrayFormat: 'repeat' })
    })

    return result.data
  }

  @Action({ commit: 'store' })
  async create (publisher: Publisher) {
    const result = await axios.post(api, publisher)

    return result.data
  }

  @Mutation
  store (publisher: Publisher) {
    Vue.set(this.publishers, publisher.identity, publisher)
  }

  @Mutation
  storeAll (publishers: Array<Publisher>) {
    // ミューテーションを重ねていいのか？
    publishers.forEach((publisher) =>
      Vue.set(this.publishers, publisher.identity, publisher)
    )
  }
}
