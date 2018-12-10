import axios from 'axios'
import Vue from 'vue'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Customer } from '@/models/Customer'
import store from '@/plugins/store'

const api = 'http://localhost:9000/customers'

interface State {
  [key: string]: Customer
}

@Module({ dynamic: true, name: 'customerModule', namespaced: true, store })
export default class Customers extends VuexModule {
  customers: State = {}

  @Action({ commit: 'storeAll' })
  async retrieve () {
    const result = await axios.get(api)

    return result.data
  }

  @Action({ commit: 'store' })
  async create (customer: Customer) {
    const result = await axios.post(api, customer)

    return result.data
  }

  @Mutation
  store (customer: Customer) {
    Vue.set(this.customers, customer.identity, customer)
  }

  @Mutation
  storeAll (customers: Array<Customer>) {
    // ミューテーションを重ねていいのか？
    customers.forEach((customer) =>
      Vue.set(this.customers, customer.identity, customer)
    )
  }
}
