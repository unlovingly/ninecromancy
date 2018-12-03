import axios from 'axios';
import {
  ActionContext,
  ActionTree,
  GetterTree,
  MutationTree
} from 'vuex';
import { Slip } from '@/models/slip/Sales';
import Vue from 'vue';

const api = 'http://localhost:9000/slips/sales'

interface State {
  slips: {
    [key: string]: Slip
  }
}

const state: State = {
  slips: {}
}

const actions = <ActionTree<State, any>>{
  create(store: ActionContext<State, any>, slip: Slip) {
    return axios.post(api, slip)
      .then((r) => {
        store.commit('store', r.data)

        return r.data.identity
      })
  },

  retrieve(store: ActionContext<State, any>) {
    return axios.get(api)
      .then((r) => {
        r.data.forEach((slip: Slip) => {
          store.commit('store', slip)
        });
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

const getters = <GetterTree<State, any>>{
  show(state) {
    return (id: string) => state.slips[id]
  }
}

const mutations = <MutationTree<State>>{
  store(state: State, payload: Slip) {
    Vue.set(state.slips, payload.identity, payload)
  },
}

export const sales = {
  namespaced: true,
  actions: actions,
  getters: getters,
  state: state,
  mutations: mutations,
}