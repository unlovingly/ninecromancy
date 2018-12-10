import axios from 'axios'
import Vue from 'vue'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Product } from '@/models/Product'
import store from '@/plugins/store'

const api = 'http://localhost:9000/products'

interface State {
  [key: string]: Product
}

@Module({ dynamic: true, name: 'productModule', namespaced: true, store })
export default class Products extends VuexModule {
  products: State = {}

  @Action({ commit: 'storeAll' })
  async retrieve () {
    const result = await axios.get(api)

    return result.data
  }

  @Action({ commit: 'store' })
  async create (product: Product) {
    const result = await axios.post(api, product)

    return result.data
  }

  @Mutation
  store (product: Product) {
    Vue.set(this.products, product.identity, product)
  }

  @Mutation
  storeAll (products: Array<Product>) {
    // ミューテーションを重ねていいのか？
    products.forEach((product) =>
      Vue.set(this.products, product.identity, product)
    )
  }
}
