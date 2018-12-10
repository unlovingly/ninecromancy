<template>
  <h2 class="primary--text">
    <slot />
  </h2>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageSubHeader'
})
</script>
