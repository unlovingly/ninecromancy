<template>
  <VContainer
    v-if="slip"
    grid-list-md
  >
    <VLayout row>
      <VFlex>
        <VCard flat>
          <VCardTitle primary-title>
            <PageHeader>{{ slip.identity }}</PageHeader>
            {{ slip.senderId }} / {{ slip.number }} {{ slip.publishedAt }}
          </VCardTitle>
        </VCard>
      </VFlex>
    </VLayout>
    <VLayout row>
      <VFlex>
        <VDataTable
          item-key="identity"
          :headers="headers"
          :items="slip.items"
        >
          <template
            slot="items"
            slot-scope="props"
          >
            <td>{{ props.item.productId }}</td>
            <td>{{ props.item.amount }}</td>
            <td>{{ props.item.price }}</td>
          </template>
        </VDataTable>
      </VFlex>
    </VLayout>
  </VContainer>
  <NotFound v-else />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import NotFound from '@/components/NotFound.vue'
import PageHeader from '@/components/PageHeader.vue'
import i18n from '@/plugins/i18n'
import Slips from '@/stores/slip/purchase'

const slipModule = getModule(Slips)

@Component<PurchaseSlipsDetailView>({
  components: { NotFound, PageHeader },
  props: {
    id: String
  }
})
export default class PurchaseSlipsDetailView extends Vue {
  headers = [
    { text: i18n.t('product.product'), value: 'productId' },
    { text: i18n.t('slip.amount'), value: 'amount' },
    { text: i18n.t('slip.price'), value: 'price' }
  ]
  id!: string

  get slip () {
    return slipModule.slips[this.id]
  }

  get slips () {
    return slipModule.slips
  }

  created () {
    slipModule.show(this.id)
  }
}
</script>
