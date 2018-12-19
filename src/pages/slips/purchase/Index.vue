<template>
  <VCard v-if="isNotEmpty">
    <VCardTitle>
      {{ $t('slip.storing') }}
      <VSpacer />
      <VTextField
        v-model="search"
        append-icon="search"
        hide-details
        label="Search"
        single-line
      />
    </VCardTitle>
    <VDataTable
      :headers="headers"
      :items="Object.values(slips)"
      :search="search"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <RouterLink
          :to="{
            name: 'slip.purchase.detail',
            params: { id: props.item.identity }
          }"
          tag="tr"
        >
          <td>{{ props.item.number }}</td>
          <td>{{ props.item.senderId }}</td>
          <td>{{ props.item.receiverId }}</td>
          <td>{{ props.item.approvedAt }}</td>
          <td>{{ props.item.publishedAt }}</td>
        </RouterLink>
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
import Slips from '@/stores/slip/purchase'

const slipModule = getModule(Slips)

@Component({
  components: { NotFound }
})
export default class PurchaseSlipsView extends Vue {
  headers = [
    { text: i18n.t('slip.number'), value: 'number' },
    { text: i18n.t('slip.senderId'), value: 'senderId' },
    { text: i18n.t('slip.receiverId'), value: 'receiverId' },
    { text: i18n.t('slip.approvedAt'), value: 'approvedAt' },
    { text: i18n.t('slip.publishedAt'), value: 'publishedAt' }
  ]
  search = ''

  get isNotEmpty () {
    return Object.values(this.slips).length > 0
  }

  get slips () {
    return slipModule.slips
  }

  created () {
    slipModule.retrieve()
  }
}
</script>
