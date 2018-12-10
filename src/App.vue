<template>
  <v-app>
    <v-navigation-drawer absolute overflow permanent app>
      <v-list dense>
        <v-list-tile to="myself" avatar>
          <v-list-tile-avatar>
            <v-icon>directions_run</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-if="me">{{ me.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense>
        <recursive-nav-bar
          v-for="n in node"
          :actions="n.actions"
          :header="n.header"
          :key="n.header"
          :node="n.node"
        ></recursive-nav-bar>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark flat>
      <v-spacer/>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import RecursiveNavBar from "@/components/RecursiveNavBar.vue";
import { Shop } from "@/models/Shop";

export default Vue.extend({
  components: {
    RecursiveNavBar
  },
  data: () => ({
    node: [
      {
        actions: {
          "actions.create": "product.create",
          "actions.index": "product.index"
        },
        header: "product.product"
      },
      {
        actions: {
          "actions.create": "publisher.create",
          "actions.index": "publisher.index"
        },
        header: "publisher.publisher"
      },
      {
        header: "slip.slip",
        node: [
          {
            actions: {
              "actions.create": "slip.sales.sell",
              "actions.index": "slip.sales.index"
            },
            header: "slip.sales"
          },
          {
            actions: {
              "actions.create": "slip.purchase.storing",
              "actions.index": "slip.purchase.index"
            },
            header: "slip.storing"
          }
        ]
      },
      {
        header: "customer.customer",
        actions: {
          "actions.create": "customer.create",
          "actions.index": "customer.index"
        }
      }
    ]
  }),
  props: {
    source: String
  },
  computed: {
    me() {
      return this.$store.getters["shopModule/show"](
        "00000000-0000-0000-0000-000000000000"
      );
    }
  },
  created() {
    this.$store.dispatch(
      "shopModule/show",
      "00000000-0000-0000-0000-000000000000"
    );
  }
});
</script>
