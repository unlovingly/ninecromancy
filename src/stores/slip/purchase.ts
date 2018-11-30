import axios from 'axios';
import * as R from 'ramda'
import Vue from 'vue'
import {
  ActionContext,
  ActionTree,
  GetterTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Slip } from '@/models/slip/Purchase';

const api = 'http://localhost:9000/slips/purchases'

interface State {
  slips: Array<Slip>
}

const empty: Slip = {
  identity: "",
  number: "",
  description: "",
  senderId: "",
  receiverId: "",
  items: [],
  approvedAt: new Date(),
  publishedAt: new Date(),
}

const state: State = {
  slips: [
  ]
}

const getters = <GetterTree<State, any>>{
  show(state) {
    return (id: string) => {
      return state.slips[R.findIndex(R.propEq('identity', id))(state.slips)] || empty
    }
  }
}

const actions = <ActionTree<State, any>>{
  retrieve(store: ActionContext<State, any>) {
    axios.get(`${api}`)
      .then((r) => {
        store.commit('initialize', r.data)
      })
  },

  show(store: ActionContext<State, any>, id: string) {
    // TODO distinct
    axios.get(`${api}/detail/${id}`)
      .then((r) => {
        store.commit('store', r.data)
      })
  },

  create(store: ActionContext<State, any>, slip: Slip) {
    axios.post(`${api}/storing`, slip)
      .then((r) => {
        store.commit('store', r.data)
      })
  },
}

const mutations = <MutationTree<State>>{
  initialize(state: State, payload: Array<Slip>) {
    Vue.set(state, 'slips', payload)
  },
  store(state: State, payload: Slip) {
    state.slips.push(payload)
  },
}

export const purchase = {
  namespaced: true,
  actions: actions,
  getters: getters,
  state: state,
  mutations: mutations,
}