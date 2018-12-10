import axios from 'axios';
import Vue from 'vue'
import {
  Action,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators"
import { Shop } from '@/models/Shop';
import store from "@/plugins/store"

const api = 'http://localhost:9000/shops'

interface State {
  [key: string]: Shop
}

@Module({ dynamic: true, name: "shopModule", namespaced: true, store })
export default class Shops extends VuexModule {
  shops: State = {}

  @Action({ commit: 'storeAll' })
  async retrieve() {
    const result = await axios.get(api)

    return result.data
  }

  @Action({ commit: 'store' })
  async show(id: string) {
    const result = await axios.get(`${api}/detail/${id}`)

    return result.data
  }

  @Action({ commit: 'store' })
  async create(shop: Shop) {
    const result = await axios.post(api, shop)

    return result.data
  }

  @Mutation
  store(shop: Shop) {
    Vue.set(this.shops, shop.identity, shop)
  }

  @Mutation
  storeAll(shops: Array<Shop>) {
    // ミューテーションを重ねていいのか？
    shops.forEach(shop =>
      Vue.set(this.shops, shop.identity, shop)
    )
  }
}