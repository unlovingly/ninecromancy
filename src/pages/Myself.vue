<template>
  <VCard v-if="me">
    <VCardTitle>{{ me.name }}</VCardTitle>
  </VCard>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import Application from '@/stores/app'
import Shops from '@/stores/shops'

const appModule = getModule(Application)
const shopModule = getModule(Shops)

@Component
export default class MyselfView extends Vue {
  get me () {
    return shopModule.shops[appModule.app.shopId]
  }
}
</script>
