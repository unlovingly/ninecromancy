import axios from 'axios';
import {
  ActionContext,
  ActionTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Publisher } from '@/models/Publisher';

interface State {
  publishers: Array<Publisher>;
}

const state: State = {
  publishers: [
    { id: "00001", name: "Publisher One" },
    { id: "00002", name: "Publisher Two" },
  ]
}

const actions = <ActionTree<State, Publisher>>{
  retrieve(store: ActionContext<State, Publisher>) {
    axios('')
      .then((r) => {
        store.commit('retrieve', r.data)
      })
  },

  create(store: ActionContext<State, Publisher>, publisher: Publisher) {
    store.commit('store', publisher);
  },
}

const mutations = <MutationTree<State>>{
  retrieve(state: State, payload: Publisher) {
    state.publishers.push(payload)
  },

  store(state: State, payload: Publisher) {
    state.publishers.push(payload)
  },
}

export const publisherModule = {
  namespaced: true,
  actions: actions,
  state: state,
  mutations: mutations,
}