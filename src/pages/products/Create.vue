<template>
  <VForm>
    <PageHeader>{{ $t('product.product') }}</PageHeader>

    <VTextField
      v-model="product.name"
      :label="$t('product.name')"
      required
    />

    <VAutocomplete
      v-model="product.publisherId"
      :items="Object.values(publishers)"
      item-text="name"
      :label="$t('publisher.name')"
      item-value="id"
      required
    />

    <VBtn @click="create">
      submit
    </VBtn>
  </VForm>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import PageHeader from '@/components/PageHeader.vue'
import PageSubHeader from '@/components/PageSubHeader.vue'
import Products from '@/stores/products'
import Publishers from '@/stores/publishers'

const productModule = getModule(Products)
const publisherModule = getModule(Publishers)

@Component({
  components: { PageHeader, PageSubHeader }
})
export default class CreateProductView extends Vue {
  product = {
    name: '',
    publisherId: ''
  }

  get products () {
    return productModule.products
  }

  get publishers () {
    return publisherModule.publishers
  }

  create () {
    this.$store.dispatch('productModule/create', this.product)
  }

  created () {
    this.$store.dispatch('publisherModule/retrieve')
  }
}
</script>
