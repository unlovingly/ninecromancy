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
import { Customer, CustomerLike } from '@/models/Customer'
import store from '@/plugins/store'
import Application from '@/stores/app'

const appModule = getModule(Application)
const api = appModule.app.api + '/customers'

const getter = encaseP<any, any, string>(axios.get)
const poster = encaseP2<any, any, string, CustomerLike>(axios.post)

interface State {
  [key: string]: Customer
}

@Module({ dynamic: true, name: 'customerModule', namespaced: true, store })
export default class Customers extends VuexModule {
  customers: State = {}

  @Action
  retrieve () {
    return getter(api)
      .map(r => r.data as Array<Customer>)
      .map(r => {
        this.context.commit('storeAll', r)

        return r
      })
      .promise()
  }

  @Action
  create (customer: CustomerLike) {
    return poster(api, customer)
      .map(r => r.data as Customer)
      .map(r => {
        this.context.commit('store', r)

        return r
      })
      .promise()
  }

  @Mutation
  store (customer: Customer) {
    Vue.set(this.customers, customer.identity, customer)
  }

  @Mutation
  storeAll (customers: Array<Customer>) {
    // ミューテーションを重ねていいのか？
    customers.forEach(customer =>
      Vue.set(this.customers, customer.identity, customer)
    )
  }
}
