import axios from 'axios';
import {
  ActionContext,
  ActionTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Product } from '@/models/Product';

interface State {
  products: Array<Product>;
}

const state: State = {
  products: [
    { id: "00001", name: "Product One", publisherId: "00001" },
    { id: "00002", name: "Product Two", publisherId: "00001" },
  ]
}

const actions = <ActionTree<State, Product>>{
  retrieve(store: ActionContext<State, Product>) {
    axios('')
      .then((r) => {
        store.commit('retrieve', r.data)
      })
  },

  create(store: ActionContext<State, Product>, product: Product) {
    store.commit('retrieve', product)
  },
}

const mutations = <MutationTree<State>>{
  retrieve(state: State, payload: Product) {
    state.products.push(payload)
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