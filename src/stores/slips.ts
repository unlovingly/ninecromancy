import axios from 'axios';
import {
  ActionContext,
  ActionTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Slip } from '@/models/slip/Slip';

const api = 'http://localhost:9000/slips'

interface State {
  slips: Array<Slip>;
}

const state: State = {
  slips: []
}

const actions = <ActionTree<State, any>>{
  retrieve(store: ActionContext<State, any>) {
    axios.get(api)
      .then((r) => {
        store.commit('initialize', r.data)
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
    state.slips = payload
  },
  store(state: State, payload: Slip) {
    state.slips.push(payload)
  },
}

export const slipModule = {
  namespaced: true,
  actions: actions,
  state: state,
  mutations: mutations,
}