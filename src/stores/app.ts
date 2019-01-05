import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/plugins/store'

interface State {
  api: string
  shopId: string
}

@Module({ dynamic: true, name: 'appModule', namespaced: true, store })
export default class Application extends VuexModule {
  app: State = {
    api: 'http://web:9000',
    shopId: '00000000-0000-0000-0000-000000000000'
  }
}
