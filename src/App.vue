<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed permanent dark app>
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
        <v-divider light></v-divider>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          value="true"
          ripple
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(action, legend) in item.actions"
            :key="action"
            :to="{ name: action }"
            ripple
            exact
          >{{ $t(legend) }}</v-list-tile>
        </v-list-group>
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
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        actions: {
          "actions.create": "product.create",
          "actions.index": "product.index"
        },
        name: "product",
        title: "product.product"
      },
      {
        actions: {
          "actions.create": "publisher.create",
          "actions.index": "publisher.index"
        },
        name: "publisher",
        title: "publisher.publisher"
      },
      {
        actions: {
          "actions.create": "shop.create",
          "actions.index": "shop.index",
          "shop.stocks.stocks": "shop.stocks"
        },
        name: "shop",
        title: "shop.shop"
      },
      {
        actions: {
          "slip.storing": "slip.storing",
          "slip.sales": "slip.sell",
          "actions.index": "slip.index"
        },
        name: "slip",
        title: "slip.slip"
      }
    ]
  }),
  props: {
    source: String
  }
};
</script>
