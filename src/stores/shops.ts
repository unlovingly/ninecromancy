import axios from 'axios';
import * as R from 'ramda'
import {
  ActionContext,
  ActionTree,
  GetterTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Shop } from '@/models/Shop';
import { Stock } from '@/models/Stock';

const api = 'http://localhost:9000/shops'

interface State {
  shops: Array<Shop>;
}

const state: State = {
  shops: [
    { id: "00001", name: "Shop One", stocks: [] },
  ]
}

const getters = <GetterTree<State, any>>{
  browser(state) {
    return (shopId: string, pluCode: string) => {
      const shop = state.shops[R.findIndex(R.propEq("id", shopId))(state.shops)]
      const stock = shop && shop.stocks[R.findIndex(R.propEq("pluCode", pluCode))(shop.stocks)]
      return stock
    }
  }
}

const actions = <ActionTree<State, any>>{
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

  browse(store: ActionContext<State, any>, pluCode: string) {
    return axios.get(`${api}/retrieveStockBy/${pluCode}`)
      .then((r) => {
        store.commit('store', r.data)
      })
  },

  create(store: ActionContext<State, any>, shop: Shop) {
    store.commit('store', shop);
  },
}

const mutations = <MutationTree<State>>{
  retrieve(state: State, payload: Shop) {
    state.shops.push(payload)
  },

  store(state: State, payload: Shop) {
    state.shops.push(payload)
  },
}

export const shopModule = {
  namespaced: true,
  actions: actions,
  getters: getters,
  state: state,
  mutations: mutations,
}