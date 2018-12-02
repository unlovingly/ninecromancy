<template>
  <v-list-group value="true" ripple :sub-group="inside" :no-action="inside">
    <v-list-tile slot="activator">
      <v-list-tile-title>{{ $t(header) }}</v-list-tile-title>
    </v-list-tile>
    <v-divider light v-if="!node && !inside"/>
    <v-list-tile
      v-for="(a, l) in actions"
      :key="a"
      :to="{ name: a }"
      ripple
      exact
    >
      <v-list-tile-title>{{ $t(l) }}</v-list-tile-title>
    </v-list-tile>
    <recursive-nav-bar
      inside
      no-action
      v-if="node"
      v-for="n in node"
      :actions="n.actions"
      :header="n.header"
      :key="n.header"
      :node="n.node"
    />
  </v-list-group>
</template>
  
  <script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "RecursiveNavBar",
  props: {
    actions: Object,
    header: String,
    node: Array,
    inside: Boolean
  }
});
</script>
  