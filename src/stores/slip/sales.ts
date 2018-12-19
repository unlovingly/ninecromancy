import axios from 'axios'
import { encaseP, encaseP2 } from 'fluture'
import Vue from 'vue'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import {
  SalesSlip as Slip,
  SalesSlipLike as SlipLike
} from '@/models/slip/Sales'
import store from '@/plugins/store'

const api = 'http://localhost:9000/slips/sales'

const getter = encaseP<any, any, string>(axios.get)
const poster = encaseP2<any, any, string, SlipLike>(axios.post)

interface State {
  [key: string]: Slip
}

@Module({ dynamic: true, name: 'salesSlipModule', namespaced: true, store })
export default class Slips extends VuexModule {
  slips: State = {}

  @Action
  create (slip: SlipLike) {
    return poster(api, slip)
      .map(r => r.data as Slip) // TODO reject
      .map(r => {
        this.context.commit('store', r)

        return r
      })
      .promise() // 本当はそのまま返したいが  vuex-module-decorators に置き換えられてしまう
  }

  @Action
  retrieve () {
    return getter(api)
      .map(r => r.data as Array<Slip>)
      .map(r => {
        this.context.commit('storeAll', r)

        return r
      })
      .promise()
  }

  @Action
  show (id: string) {
    return getter(`${api}/detail/${id}`)
      .map(r => r.data as Slip)
      .map(r => {
        this.context.commit('store', r)

        return r
      })
      .promise()
  }

  @Mutation
  store (slip: Slip) {
    Vue.set(this.slips, slip.identity, slip)
  }

  @Mutation
  storeAll (slips: Array<Slip>) {
    // ミューテーションを重ねていいのか？
    slips.forEach(slip => Vue.set(this.slips, slip.identity, slip))
  }
}
