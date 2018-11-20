import axios from 'axios';
import {
  ActionContext,
  ActionTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Product } from '@/models/Product';

const api = 'http://localhost:9000/products/'

interface State {
  products: Array<Product>;
}

const state: State = {
  products: []
}

const actions = <ActionTree<State, Product>>{
  retrieve(store: ActionContext<State, Product>) {
    axios.get(api + 'index')
      .then((r) => {
        store.commit('initialize', r.data)
      })
  },

  create(store: ActionContext<State, Product>, product: Product) {
    store.commit('store', product)
  },
}

const mutations = <MutationTree<State>>{
  initialize(state: State, payload: Array<Product>) {
    state.products = payload
  },
  store(state: State, payload: Product) {
    state.products.push(payload)
  },
}

export const productModule = {
  namespaced: true,
  actions: actions,
  state: state,
  mutations: mutations,
}