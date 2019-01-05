import axios from 'axios'
import { encaseP, encaseP2 } from 'fluture'
import Vue from 'vue'
import {
  getModule,
  Action,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators'
import {
  PurchaseSlip as Slip,
  PurchaseSlipLike as SlipLike
} from '@/models/slip/Purchase'
import store from '@/plugins/store'
import Application from '@/stores/app'

const appModule = getModule(Application)
const api = appModule.app.api + '/slips/purchases'

const getter = encaseP<any, any, string>(axios.get)
const poster = encaseP2<any, any, string, SlipLike>(axios.post)

interface State {
  [key: string]: Slip
}

@Module({ dynamic: true, name: 'purchaseSlipModule', namespaced: true, store })
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
      .promise() // 本当はそのまま返したいが vuex-module-decorators に置き換えられてしまう
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
    Vue.set(this.slips, slip.identity as string, slip)
  }

  @Mutation
  storeAll (slips: Array<Slip>) {
    // ミューテーションを重ねていいのか？
    slips.forEach(slip => Vue.set(this.slips, slip.identity as string, slip))
  }
}
