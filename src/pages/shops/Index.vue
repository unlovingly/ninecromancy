<template>
  <VCard v-if="isNotEmpty">
    <VCardTitle>
      {{ $t('shop.shop') }}
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
      :items="Object.values(shops)"
      :search="search"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <td>{{ props.item.name }}</td>
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
import Shops from '@/stores/shops'

const shopModule = getModule(Shops)

@Component({
  components: { NotFound },
  subscriptions () {
    return {
      isNotEmpty: this.$watchAsObservable('shops').pipe(
        pluck('newValue'),
        merge(of(shopModule.shops)),
        map((x) => Object.values(x).length > 0)
      )
    }
  }
})
export default class ShopsView extends Vue {
  headers = [{ text: i18n.t('shop.name'), value: 'name' }]
  search = ''

  get shops () {
    return shopModule.shops
  }

  created () {
    this.$store.dispatch('shopModule/retrieve')
  }
}
</script>
