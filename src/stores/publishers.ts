import axios from 'axios';
import Vue from 'vue'
import {
  ActionContext,
  ActionTree,
  MutationTree
} from 'vuex';
import { Publisher } from '@/models/Publisher';

const api = 'http://localhost:9000/publishers'

interface State {
  publishers: {
    [key: string]: Publisher
  }
}

const state: State = {
  publishers: {}
}

const actions = <ActionTree<State, any>>{
  retrieve(store: ActionContext<State, any>) {
    return axios.get(api)
      .then((r) => {
        r.data.forEach((publisher: Publisher) => {
          store.commit('store', publisher)
        });
      })
  },

  create(store: ActionContext<State, any>, publisher: Publisher) {
    return axios.post(api, publisher)
      .then((r) => {
        store.commit('store', r.data)

        return r.data.id
      })
  },
}

const mutations = <MutationTree<State>>{
  store(state: State, payload: Publisher) {
    Vue.set(state.publishers, payload.id, payload)
  },
}

export const publisherModule = {
  namespaced: true,
  actions: actions,
  state: state,
  mutations: mutations,
}