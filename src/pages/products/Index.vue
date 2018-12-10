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
import { of } from 'rxjs'
import { map, merge, pluck } from 'rxjs/operators'
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
  components: { NotFound },
  subscriptions () {
    return {
      isNotEmpty: this.$watchAsObservable('products').pipe(
        pluck('newValue'),
        merge(of(productModule.products)),
        map(x => Object.values(x).length > 0)
      )
    }
  }
})
export default class ProductsView extends Vue {
  headers = [
    { text: i18n.t('product.name'), value: 'name' },
    { text: i18n.t('publisher.name'), value: 'publisherId' }
  ]
  search = ''

  get products () {
    return productModule.products
  }

  get publishers () {
    return publisherModule.publishers
  }

  created () {
    this.$store.dispatch('productModule/retrieve').then(() => {
      const keys = Object.values(productModule.products).map(p => p.publisherId)

      this.$store.dispatch('publisherModule/retrieveByKeys', keys)
    })
  }
}
</script>
