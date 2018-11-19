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
            v-for="action in actions"
            :key="action"
            :to="{ name: `${item.name}.${action}` }"
            ripple
            exact
          >{{ $t(`actions.${action}`) }}</v-list-tile>
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
        name: "product",
        title: "product.product"
      },
      {
        name: "publisher",
        title: "publisher.publisher"
      },
      {
        name: "shop",
        title: "shop.shop"
      },
      {
        name: "slip",
        title: "slip.slip"
      }
    ],
    actions: ["create", "index"]
  }),
  props: {
    source: String
  }
};
</script>
