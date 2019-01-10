<template>
  <h1 class="primary--text">
    <slot />
  </h1>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageHeader'
})
</script>
