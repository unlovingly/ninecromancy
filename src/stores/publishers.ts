import axios from 'axios';
import {
  ActionContext,
  ActionTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Publisher } from '@/models/Publisher';

const api = 'http://localhost:9000/publishers/'

interface State {
  publishers: Array<Publisher>;
}

const state: State = {
  publishers: []
}

const actions = <ActionTree<State, Publisher>>{
  retrieve(store: ActionContext<State, Publisher>) {
    axios.get(api + 'index')
      .then((r) => {
        store.commit('initialize', r.data)
      })
  },

  create(store: ActionContext<State, Publisher>, publisher: Publisher) {
    store.commit('store', publisher);
  },
}

const mutations = <MutationTree<State>>{
  initialize(state: State, payload: Array<Publisher>) {
    state.publishers = payload
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