import axios from 'axios';
import {
  ActionContext,
  ActionTree,
  ModuleTree,
  MutationTree
} from 'vuex';
import { Publisher } from '@/models/Publisher';

const origin = 'http://localhost:9000'
const api = origin + '/publishers/'

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
        r.data.forEach((p: Publisher) => {
          store.commit('store', p)
        });
      })
  },

  create(store: ActionContext<State, Publisher>, publisher: Publisher) {
    store.commit('store', publisher);
  },
}

const mutations = <MutationTree<State>>{
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