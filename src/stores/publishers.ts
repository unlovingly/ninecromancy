import axios from 'axios';
import {
  ActionContext,
  ActionTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Publisher } from '@/models/Publisher';

const api = 'http://localhost:9000/publishers'

interface State {
  publishers: Array<Publisher>;
}

const state: State = {
  publishers: []
}

const actions = <ActionTree<State, any>>{
  retrieve(store: ActionContext<State, any>) {
    axios.get(api)
      .then((r) => {
        store.commit('initialize', r.data)
      })
  },

  create(store: ActionContext<State, any>, publisher: Publisher) {
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