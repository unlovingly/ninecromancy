<template>
  <VForm ref="form">
    <VTextField
      v-model="name"
      :label="$t('shop.name')"
      required
    />
    <VBtn @click="create(name)">
      submit
    </VBtn>
  </VForm>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import PageHeader from '@/components/PageHeader.vue'
import Shops from '@/stores/shops'

const shopModule = getModule(Shops)

@Component({
  components: { PageHeader }
})
export default class CreateShopView extends Vue {
  shop = {
    name: ''
  }

  create () {
    shopModule.create(this.shop)
  }
}
</script>
