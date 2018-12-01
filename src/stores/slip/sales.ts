import axios from 'axios';
import S from "sanctuary"
import {
  ActionContext,
  ActionTree,
  GetterTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Slip } from '@/models/slip/Sales';
import Vue from 'vue';

const api = 'http://localhost:9000/slips/sales'

interface State {
  sales: {
    [key: string]: Slip
  }
}

const state: State = {
  sales: {}
}

const actions = <ActionTree<State, any>>{
  create(store: ActionContext<State, any>, slip: Slip) {
    return axios.post(api, slip)
      .then((r) => {
        store.commit('store', r.data)
      })
  },

  show(store: ActionContext<State, any>, id: string) {
    // TODO distinct
    return axios.get(`${api}/detail/${id}`)
      .then((r) => {
        store.commit('store', r.data)
      })
  },

  retrieve(store: ActionContext<State, any>) {
    return axios.get(`${api}`)
      .then((r) => {
        store.commit('store', r.data)
      })
  },
}

const getters = <GetterTree<State, any>>{
  show(state) {
    return (id: string) => {
      return S.get((x: Slip) => x === x)(id)(state.sales)
    }
  }
}

const mutations = <MutationTree<State>>{
  store(state: State, payload: Slip) {
    Vue.set(state.sales, payload.identity, payload)
  },
}

export const sales = {
  namespaced: true,
  actions: actions,
  getters: getters,
  state: state,
  mutations: mutations,
}