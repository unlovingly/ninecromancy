import axios from 'axios';
import {
  ActionContext,
  ActionTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Shop } from '@/models/Shop';
import { Stock } from '@/models/Stock';

const api = 'http://localhost:9000/shops/stocks'

interface State {
  stocks: Array<Stock>;
}

const state: State = {
  stocks: [
  ]
}

const actions = <ActionTree<State, any>>{
  retrieve(store: ActionContext<State, any>, q: string) {
    axios.get(`${api}/${q}`)
      .then((r) => {
        r.data.forEach((s: Shop) => {
          s.stocks.forEach(t => {
            store.commit('retrieve', t)
          });
        });
      })
  },

  create(store: ActionContext<State, any>, stock: Stock) {
    store.commit('store', stock);
  },
}

const mutations = <MutationTree<State>>{
  retrieve(state: State, payload: Stock) {
    state.stocks.push(payload)
  },

  store(state: State, payload: Stock) {
    state.stocks.push(payload)
  },
}

export const stockModule = {
  namespaced: true,
  actions: actions,
  state: state,
  mutations: mutations,
}