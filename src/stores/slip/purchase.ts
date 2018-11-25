import axios from 'axios';
import {
  ActionContext,
  ActionTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Slip } from '@/models/slip/Purchase';

const api = 'http://localhost:9000/slips'

interface State {
  slip: Slip
}

const state: State = {
  slip: {
    identity: "",
    number: "",
    description: "",
    senderId: "",
    receiverId: "",
    items: [],
    approvedAt: new Date(),
    publishedAt: new Date(),
  }
}

const actions = <ActionTree<State, any>>{
  retrieve(store: ActionContext<State, any>, id: String) {
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
  store(state: State, payload: Slip) {
    state.slip = payload
  },
}

export const purchase = {
  namespaced: true,
  actions: actions,
  state: state,
  mutations: mutations,
}