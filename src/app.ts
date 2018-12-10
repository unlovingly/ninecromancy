import Vue from "vue";
import Component from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import RecursiveNavBar from "@/components/RecursiveNavBar.vue";
import nodes from "@/resources/nav";
import Shops from "@/stores/shops";

const shopModule = getModule(Shops);

@Component({
  components: { RecursiveNavBar }
})
export default class MainView extends Vue {
  private shopId = "00000000-0000-0000-0000-000000000000";

  private nodes = nodes;

  get me() {
    return shopModule.shops[this.shopId];
  }

  created() {
    this.$store.dispatch("shopModule/show", this.shopId);
  }
}
