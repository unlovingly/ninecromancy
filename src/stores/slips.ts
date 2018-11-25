import * as Purchase from '@/stores/slip/purchase';
import * as Sales from '@/stores/slip/sales';

const api = 'http://localhost:9000/slips'

export const slipModule = {
  modules: {
    ...Purchase,
    ...Sales,
  },
  namespaced: true,
}