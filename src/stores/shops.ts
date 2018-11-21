import axios from 'axios';
import {
  ActionContext,
  ActionTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Shop } from '@/models/Shop';

const api = 'http://localhost:9000/shops'

interface State {
  shops: Array<Shop>;
}

const state: State = {
  shops: [
    { id: "00001", name: "Shop One" },
  ]
}

const actions = <ActionTree<State, any>>{
  retrieve(store: ActionContext<State, any>) {
    axios.get(api)
      .then((r) => {
        store.commit('retrieve', r.data)
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
  state: state,
  mutations: mutations,
}