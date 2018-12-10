<template>
  <VCard v-if="me">
    <VCardTitle>{{ me.name }}</VCardTitle>
  </VCard>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import Shops from '@/stores/shops'

const shopModule = getModule(Shops)

@Component
export default class MyselfView extends Vue {
  private shopId = '00000000-0000-0000-0000-000000000000'

  get me () {
    return shopModule.shops[this.shopId]
  }
}
</script>
