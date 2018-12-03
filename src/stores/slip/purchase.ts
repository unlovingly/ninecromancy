import axios from 'axios';
import Vue from 'vue'
import {
  ActionContext,
  ActionTree,
  GetterTree,
  MutationTree
} from 'vuex';
import { Slip } from '@/models/slip/Purchase';

const api = 'http://localhost:9000/slips/purchases'

interface State {
  slips: {
    [key: string]: Slip
  }
}

const state: State = {
  slips: {}
}

const getters = <GetterTree<State, any>>{
  show(state) {
    return (id: string) => state.slips[id]
  }
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

const mutations = <MutationTree<State>>{
  store(state: State, payload: Slip) {
    Vue.set(state.slips, payload.identity, payload)
  },
}

export const purchase = {
  namespaced: true,
  actions: actions,
  getters: getters,
  state: state,
  mutations: mutations,
}