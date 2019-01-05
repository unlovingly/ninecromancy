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
import { Product, ProductLike } from '@/models/Product'
import store from '@/plugins/store'
import Application from '@/stores/app'

const appModule = getModule(Application)
const api = appModule.app.api + '/products'

const getter = encaseP<any, any, string>(axios.get)
const poster = encaseP2<any, any, string, ProductLike>(axios.post)

interface State {
  [key: string]: Product
}

@Module({ dynamic: true, name: 'productModule', namespaced: true, store })
export default class Products extends VuexModule {
  products: State = {}

  @Action
  retrieve () {
    return getter(api)
      .map(r => r.data as Array<Product>)
      .map(r => {
        this.context.commit('storeAll', r)

        return r
      })
      .promise()
  }

  @Action
  create (product: ProductLike) {
    return poster(api, product)
      .map(r => r.data as Product)
      .map(r => {
        this.context.commit('store', r)

        return r
      })
      .promise()
  }

  @Mutation
  store (product: Product) {
    Vue.set(this.products, product.identity, product)
  }

  @Mutation
  storeAll (products: Array<Product>) {
    // ミューテーションを重ねていいのか？
    products.forEach(product =>
      Vue.set(this.products, product.identity, product)
    )
  }
}
