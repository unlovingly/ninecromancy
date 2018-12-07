import axios from 'axios';
import Vue from 'vue'
import {
  ActionContext,
  ActionTree,
  MutationTree
} from 'vuex';
import { Customer } from '@/models/Customer';

const api = 'http://localhost:9000/customers'

interface State {
  customers: {
    [key: string]: Customer
  }
}

const state: State = {
  customers: {}
}

const actions = <ActionTree<State, any>>{
  retrieve(store: ActionContext<State, any>) {
    return axios.get(api)
      .then((r) => {
        r.data.forEach((customer: Customer) => {
          store.commit('store', customer)
        });
      })
  },

  create(store: ActionContext<State, any>, customer: Customer) {
    return axios.post(api, customer)
      .then((r) => {
        store.commit('store', r.data)

        return r.data.id
      })
  },
}

const mutations = <MutationTree<State>>{
  store(state: State, payload: Customer) {
    Vue.set(state.customers, payload.identity, payload)
  },
}

export const customerModule = {
  namespaced: true,
  actions: actions,
  state: state,
  mutations: mutations,
}