import axios from 'axios';
import Vue from 'vue'
import {
  ActionContext,
  ActionTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Product } from '@/models/Product';

const api = 'http://localhost:9000/products'

interface State {
  products: Array<Product>;
}

const state: State = {
  products: []
}

const actions = <ActionTree<State, any>>{
  retrieve(store: ActionContext<State, any>) {
    axios.get(api)
      .then((r) => {
        store.commit('initialize', r.data)
      })
  },

  create(store: ActionContext<State, any>, product: Product) {
    axios.post(api, product)
      .then((r) => {
        store.commit('store', r.data)
      })
  },
}

const mutations = <MutationTree<State>>{
  initialize(state: State, payload: Array<Product>) {
    Vue.set(state, 'products', payload)
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