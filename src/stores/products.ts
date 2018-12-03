import axios from 'axios';
import Vue from 'vue'
import {
  ActionContext,
  ActionTree,
  MutationTree
} from 'vuex';
import { Product } from '@/models/Product';

const api = 'http://localhost:9000/products'

interface State {
  products: {
    [key: string]: Product
  }
}

const state: State = {
  products: {}
}

const actions = <ActionTree<State, any>>{
  create(store: ActionContext<State, any>, product: Product) {
    return axios.post(api, product)
      .then((r) => {
        store.commit('store', r.data)

        return r.data.id
      })
  },

  retrieve(store: ActionContext<State, any>) {
    return axios.get(api)
      .then((r) => {
        r.data.forEach((product: Product) => {
          store.commit('store', product)
        });
      })
  },
}

const mutations = <MutationTree<State>>{
  store(state: State, payload: Product) {
    Vue.set(state.products, payload.id, payload)
  },
}

export const productModule = {
  namespaced: true,
  actions: actions,
  state: state,
  mutations: mutations,
}