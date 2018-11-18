<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      dark
      permanent
      app
    >
      <v-list dense>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <v-icon class="blue white--text">directions_run</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Shop One</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="drawer = null">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list>
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          @click="drawer = null"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              {{ $t(item.title) }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-items>
        <v-btn flat>Index</v-btn>
        <v-btn flat>Create</v-btn>
      </v-toolbar-items>
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
        title: "publisher.publisher",
        icon: "dashboard",
        path: PublisherRoutes[0].path
      },
      {
        title: "product.product",
        icon: "dashboard",
        path: ProductRoutes[0].path
      }
    ]
  }),
  props: {
    source: String
  }
};
</script>
