import axios from 'axios';
import {
  DefineActions,
  DefineGetters,
  DefineMutations
} from 'vuex-type-helper'
import { Publisher } from '../models/Publisher';

interface PublisherState {
  name: string
}

interface PublisherActions {
  retrieve: {
    name: string
  }
}

interface PublisherGetters {
  name: string
}

interface PublisherMutations {
  retrieve: {
    name: string
  }
}

const s: PublisherState = {
  name: ""
}

const g: DefineGetters<PublisherGetters, PublisherState> = {
  name: state => state.name
}

const m: DefineMutations<PublisherMutations, PublisherState> = {
  retrieve(state, { name }) {
    state.name = name
  }
}

const a: DefineActions<PublisherActions, PublisherState, PublisherMutations, PublisherGetters> = {
  retrieve({ commit }, payload) {
    commit('retrieve', payload)
  }
}

export class actions {
}