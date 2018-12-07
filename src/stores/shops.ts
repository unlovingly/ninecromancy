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

const actions = <ActionTree<State, any>>{
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
    return axios.get(`${api}/detail/${id}`)
      .then((r) => {
        store.commit('store', r.data)
      })
  },
}

const getters = <GetterTree<State, any>>{
  show(state) {
    return (id: string) => state.shops[id]
  }
}


const mutations = <MutationTree<State>>{
  store(state: State, payload: Shop) {
    Vue.set(state.shops, payload.identity, payload)
  },
}

export const shopModule = {
  namespaced: true,
  actions: actions,
  getters: getters,
  state: state,
  mutations: mutations,
}