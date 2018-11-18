<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      permanent
      dark
      app
    >
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
            v-for="action in actions"
            :key="action"
            :to="{ name: `${item.name}.${action}` }"
            ripple
            exact
            >
            {{ action }}
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      dark
      flat
    >
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
import { default as PublisherRoutes } from "@/pages/publishers/routes";
import { default as ProductRoutes } from "@/pages/products/routes";

export default {
  data: () => ({
    drawer: null,
    items: [
      {
        name: "publisher",
        title: "publisher.publisher"
      },
      {
        name: "product",
        title: "product.product"
      }
    ],
    actions: ["create", "index"]
  }),
  props: {
    source: String
  }
};
</script>
