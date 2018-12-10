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
import PageHeader from '@/components/PageHeader.vue'

@Component({
  components: { PageHeader }
})
export default class CreateShopView extends Vue {
  shop = {
    name: ''
  }

  create () {
    this.$store.dispatch('shopModule/create', this.shop)
  }
}
</script>
