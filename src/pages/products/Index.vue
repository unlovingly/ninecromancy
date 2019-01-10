<template>
  <VCard v-if="isNotEmpty">
    <VCardTitle>
      {{ $t('product.product') }}
      <VSpacer />
      <VTextField
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
    </VCardTitle>
    <VDataTable
      :headers="headers"
      :items="Object.values(products)"
      :search="search"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.publisherId }}</td>
      </template>
      <template slot="no-data">
        <VAlert
          :value="true"
          color="warning"
          icon="priority_high"
          outline
        >
          みつかりません
        </VAlert>
      </template>
      <template slot="no-results">
        <VAlert
          :value="true"
          color="info"
          icon="info"
        >
          {{ search }} なんてないさ
        </VAlert>
      </template>
    </VDataTable>
  </VCard>
  <NotFound v-else />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import NotFound from '@/components/NotFound.vue'
import i18n from '@/plugins/i18n'
import Products from '@/stores/products'
import Publishers from '@/stores/publishers'

const productModule = getModule(Products)
const publisherModule = getModule(Publishers)

@Component({
  components: { NotFound }
})
export default class ProductsView extends Vue {
  headers = [
    { text: i18n.t('product.name'), value: 'name' },
    { text: i18n.t('publisher.name'), value: 'publisherId' }
  ]
  search = ''

  get isNotEmpty () {
    return Object.values(this.products).length > 0
  }

  get products () {
    return productModule.products
  }

  get publishers () {
    return publisherModule.publishers
  }

  created () {
    productModule.retrieve().then(() => {
      const keys = Object.values(productModule.products).map(p => p.publisherId)

      publisherModule.retrieveByKeys(keys)
    })
  }
}
</script>
