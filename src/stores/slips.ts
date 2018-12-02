import * as Purchase from '@/stores/slip/purchase';
import * as Sales from '@/stores/slip/sales';

export const slipModule = {
  modules: {
    ...Purchase,
    ...Sales,
  },
  namespaced: true,
}