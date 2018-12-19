import axios from 'axios'
import { encaseP, encaseP2 } from 'fluture'
import Vue from 'vue'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Shop, ShopLike } from '@/models/Shop'
import store from '@/plugins/store'

const api = 'http://localhost:9000/shops'

const getter = encaseP<any, any, string>(axios.get)
const poster = encaseP2<any, any, string, ShopLike>(axios.post)

interface State {
  [key: string]: Shop
}

@Module({ dynamic: true, name: 'shopModule', namespaced: true, store })
export default class Shops extends VuexModule {
  shops: State = {}

  @Action
  retrieve () {
    return getter(api)
      .map(r => r.data as Array<Shop>)
      .map(r => {
        this.context.commit('storeAll', r)

        return r
      })
      .promise()
  }

  @Action
  show (id: string) {
    return getter(`${api}/detail/${id}`)
      .map(r => r.data as Shop)
      .map(r => {
        this.context.commit('store', r)

        return r
      })
      .promise()
  }

  @Action
  create (shop: ShopLike) {
    return poster(api, shop)
      .map(r => r.data as Shop)
      .map(r => {
        this.context.commit('store', r)

        return r
      })
      .promise()
  }

  @Mutation
  store (shop: Shop) {
    Vue.set(this.shops, shop.identity, shop)
  }

  @Mutation
  storeAll (shops: Array<Shop>) {
    // ミューテーションを重ねていいのか？
    shops.forEach(shop => Vue.set(this.shops, shop.identity, shop))
  }
}
