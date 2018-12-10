import axios from 'axios';
import Vue from 'vue'
import {
  Action,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators"
import { Slip } from '@/models/slip/Purchase';
import store from "@/plugins/store"

const api = 'http://localhost:9000/slips/purchases'

interface State {
  [key: string]: Slip
}

@Module({ dynamic: true, name: "purchaseSlipModule", namespaced: true, store })
export default class Slips extends VuexModule {
  slips: State = {}

  @Action({ commit: 'store' })
  async create(slip: Slip) {
    const result = await axios.post(api, slip)

    return result.data
  }

  @Action({ commit: 'storeAll' })
  async retrieve() {
    const result = await axios.get(api)

    return result.data
  }

  @Action({ commit: 'store' })
  async show(id: string) {
    const result = await axios.get(`${api}/detail/${id}`)

    return result
  }

  @Mutation
  store(slip: Slip) {
    Vue.set(this.slips, slip.identity, slip)
  }

  @Mutation
  storeAll(slips: Array<Slip>) {
    // ミューテーションを重ねていいのか？
    slips.forEach(slip =>
      Vue.set(this.slips, slip.identity, slip)
    )
  }
}