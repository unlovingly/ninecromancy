<template>
  <VListGroup
    value="true"
    ripple
    :sub-group="inside"
    :no-action="inside"
  >
    <VListTile slot="activator">
      <VListTileTitle>{{ $t(header) }}</VListTileTitle>
    </VListTile>
    <VDivider
      v-if="!node && !inside"
      light
    />
    <VListTile
      v-for="(a, l) in actions"
      :key="a"
      :to="{ name: a }"
      ripple
      exact
    >
      <VListTileTitle>{{ $t(l) }}</VListTileTitle>
    </VListTile>
    <RecursiveNavBar
      v-for="n in node"
      :key="n.header"
      inside
      no-action
      :actions="n.actions"
      :header="n.header"
      :node="n.node"
    />
  </VListGroup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    actions: Object,
    header: String,
    node: Array,
    inside: Boolean
  }
})
export default class RecursiveNavBar extends Vue {}
</script>
