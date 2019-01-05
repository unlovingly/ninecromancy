import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import RecursiveNavBar from '@/components/RecursiveNavBar.vue'
import nodes from '@/resources/nav'
import Shops from '@/stores/shops'
import Application from '@/stores/app'

const appModule = getModule(Application)
const shopModule = getModule(Shops)

@Component({
  components: { RecursiveNavBar }
  })
export default class MainView extends Vue {
  private nodes = nodes

  get me () {
    return shopModule.shops[appModule.app.shopId]
  }

  created () {
    this.$store.dispatch('shopModule/show', appModule.app.shopId)
  }
}
