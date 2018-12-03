import axios from 'axios';
import Vue from 'vue'
import {
  ActionContext,
  ActionTree,
  GetterTree,
  MutationTree
} from 'vuex';
import { Shop } from '@/models/Shop';
import { Stock } from '@/models/Stock';

const api = 'http://localhost:9000/shops'

interface State {
  stocks: {
    [key: string]: Stock
  }
}

const state: State = {
  stocks: {}
}

const getters = <GetterTree<State, any>>{
  show(state) {
    return (id: string) => state.stocks[id]
  }
}

const actions = <ActionTree<State, any>>{
  create(store: ActionContext<State, any>, stock: Stock) {
    store.commit('store', stock);
  },

  retrieveByCode(store: ActionContext<State, any>, pluCode: string) {
    return axios.get(`${api}/retrieveWithStocksByCode/${pluCode}`)
      .then((r) => {
        r.data.stocks.forEach((s: Stock) => {
          store.commit('store', s)
        });
      })
  },

  retrieveByQuery(store: ActionContext<State, any>, q: string) {
    return axios.get(`${api}/retrieveWithStocksByQuery/${q}`)
      .then((r) => {
        r.data.forEach((s: Shop) => {
          s.stocks.forEach(t => {
            store.commit('store', t)
          });
        });
      })
  },
}

const mutations = <MutationTree<State>>{
  store(state: State, payload: Stock) {
    Vue.set(state.stocks, payload.pluCode, payload)
  },
}

export const stockModule = {
  namespaced: true,
  actions: actions,
  getters: getters,
  state: state,
  mutations: mutations,
}