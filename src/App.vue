<template>
  <v-app>
    <v-navigation-drawer fixed permanent app>
      <v-list dense>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon>directions_run</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Shop One</v-list-tile-title>
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
import RecursiveNavBar from "@/components/RecursiveNavBar.vue";

export default {
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
      }
    ]
  }),
  props: {
    source: String
  }
};
</script>
