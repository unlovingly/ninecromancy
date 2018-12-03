import axios from 'axios';
import Vue from 'vue'
import {
  ActionContext,
  ActionTree,
  GetterTree,
  MutationTree
} from 'vuex';
import { Shop } from '@/models/Shop';

const api = 'http://localhost:9000/shops'

interface State {
  shops: {
    [key: string]: Shop
  }
}

const state: State = {
  shops: {}
}

const getters = <GetterTree<State, any>>{
  browser(state) {
    return (shopId: string, pluCode: string) => {
      const shop = state.shops[shopId]
      const stock = shop && shop.stocks

      return stock
    }
  }
}

const actions = <ActionTree<State, any>>{
  browse(store: ActionContext<State, any>, pluCode: string) {
    return axios.get(`${api}/retrieveStockBy/${pluCode}`)
      .then((r) => {
        store.commit('store', r.data)
      })
  },

  create(store: ActionContext<State, any>, shop: Shop) {
    return axios.post(api, shop)
      .then((r) => {
        store.commit('store', r.data)

        return r.data.id
      })
  },

  retrieve(store: ActionContext<State, any>) {
    return axios.get(api)
      .then((r) => {
        store.commit('retrieve', r.data)
      })
  },

  show(store: ActionContext<State, any>, id: string) {
    // TODO distinct
    return axios.get(`${api}/detail/${id}`)
      .then((r) => {
        store.commit('store', r.data)
      })
  },
}

const mutations = <MutationTree<State>>{
  store(state: State, payload: Shop) {
    Vue.set(state.shops, payload.id, payload)
  },
}

export const shopModule = {
  namespaced: true,
  actions: actions,
  getters: getters,
  state: state,
  mutations: mutations,
}