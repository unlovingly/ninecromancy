import axios from 'axios'
import { encaseP } from 'fluture'
import Vue from 'vue'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Stock } from '@/models/Stock'
import store from '@/plugins/store'

const api = 'http://localhost:9000/shops'

const getter = encaseP<any, any, string>(axios.get)

interface State {
  [key: string]: Stock
}

@Module({ dynamic: true, name: 'stockModule', namespaced: true, store })
export default class Stocks extends VuexModule {
  stocks: State = {}

  @Action
  retrieveByCode (pluCode: string) {
    return getter(`${api}/retrieveWithStocksByCode/${pluCode}`)
      .map(r => r.data.stocks as Array<Stock>)
      .map(r => {
        this.context.commit('storeAll', r)

        return r
      })
      .promise()
  }

  @Action
  retrieveByQuery (q: string) {
    return getter(`${api}/retrieveWithStocksByQuery?q=${q}`)
      .map(r => r.data.stocks as Array<Stock>)
      .map(r => {
        this.context.commit('storeAll', r)

        return r
      })
      .promise()
  }

  @Mutation
  store (stock: Stock) {
    Vue.set(this.stocks, stock.pluCode, stock)
  }

  @Mutation
  storeAll (stocks: Array<Stock>) {
    // ミューテーションを重ねていいのか？
    stocks.forEach(stock => Vue.set(this.stocks, stock.pluCode, stock))
  }
}
