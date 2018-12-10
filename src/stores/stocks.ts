import axios from 'axios';
import Vue from 'vue'
import {
  Action,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators"
import { Shop } from '@/models/Shop';
import { Stock } from '@/models/Stock';
import store from "@/plugins/store"

const api = 'http://localhost:9000/shops'

interface State {
  [key: string]: Stock
}

@Module({ dynamic: true, name: "stockModule", namespaced: true, store })
export default class Stocks extends VuexModule {
  stocks: State = {}

  @Action({ commit: 'storeAll' })
  async retrieveByCode(pluCode: string) {
    const result = await axios.get(`${api}/retrieveWithStocksByCode/${pluCode}`)

    return result.data
  }

  @Action({ commit: 'storeAll' })
  async retrieveByQuery(q: string) {
    const result = await axios.get(`${api}/retrieveWithStocksByQuery?q=${q}`)

    return result.data
  }

  @Mutation
  store(stock: Stock) {
    Vue.set(this.stocks, stock.pluCode, stock)
  }

  @Mutation
  storeAll(stocks: Array<Stock>) {
    // ミューテーションを重ねていいのか？
    stocks.forEach(stock =>
      Vue.set(this.stocks, stock.pluCode, stock)
    )
  }
}