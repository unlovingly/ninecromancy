import axios, { AxiosRequestConfig } from 'axios'
import { encaseP, encaseP2 } from 'fluture'
import qs from 'qs'
import Vue from 'vue'
import {
  getModule,
  Action,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators'
import { Publisher, PublisherLike } from '@/models/Publisher'
import store from '@/plugins/store'
import Application from '@/stores/app'

const appModule = getModule(Application)
const api = appModule.app.api + '/publishers'

const getter = encaseP<any, any, string>(axios.get)
const getter2 = encaseP2<any, any, string, AxiosRequestConfig>(axios.get)
const poster = encaseP2<any, any, string, PublisherLike>(axios.post)

interface State {
  [key: string]: Publisher
}

@Module({ dynamic: true, name: 'publisherModule', namespaced: true, store })
export default class Publishers extends VuexModule {
  publishers: State = {}

  @Action
  retrieve () {
    return getter(api)
      .map(r => r.data as Array<Publisher>)
      .map(r => {
        this.context.commit('storeAll', r)

        return r
      })
      .promise()
  }

  @Action
  retrieveByKeys (keys: Array<string>) {
    const p = {
      params: keys,
      paramsSerializer: (k: string) =>
        qs.stringify({ publisherId: k }, { arrayFormat: 'repeat' })
    }
    return getter2(`${api}/retrieveBy`, p)
      .map(r => r.data as Array<Publisher>)
      .map(r => {
        this.context.commit('storeAll', r)

        return r
      })
      .promise()
  }

  @Action
  create (publisher: PublisherLike) {
    return poster(api, publisher)
      .map(r => r.data as Publisher)
      .map(r => {
        this.context.commit('store', r)

        return r
      })
      .promise()
  }

  @Mutation
  store (publisher: Publisher) {
    Vue.set(this.publishers, publisher.identity, publisher)
  }

  @Mutation
  storeAll (publishers: Array<Publisher>) {
    // ミューテーションを重ねていいのか？
    publishers.forEach(publisher =>
      Vue.set(this.publishers, publisher.identity, publisher)
    )
  }
}
