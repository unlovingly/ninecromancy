<template>
  <v-app>
    <v-navigation-drawer absolute overflow permanent app>
      <v-list dense>
        <v-list-tile :to="{ name: 'myself' }" avatar>
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
          v-for="n in nodes"
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

<script src="@/app.ts" type="ts"></script>