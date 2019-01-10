<template>
  <VForm ref="form">
    <VContainer>
      <PageHeader>{{ $t('slip.sales') }}</PageHeader>
      <VLayout>
        <VFlex>
          <VMenu full-width>
            <VTextField
              slot="activator"
              :value="slip.publishedAt"
              :label="$t('slip.publishedAt')"
              readonly
            />
            <VDatePicker
              v-model="slip.publishedAt"
              landscape
              scrollable
            />
          </VMenu>
        </VFlex>
      </VLayout>
      <PageSubHeader>{{ $t('product.product') }}</PageSubHeader>
      <VLayout
        v-for="(purchase, index) in slip.items"
        :key="index"
        row
      >
        <VFlex xs2>
          <VTextField
            v-model="purchase.pluCode"
            required
            label="PLU Code"
            @keyup.enter="browse(purchase)"
          />
        </VFlex>
        <VFlex xs6>
          <VTextField
            v-model="purchase.productId"
            :label="$t('product.name')"
            required
            readonly
          />
        </VFlex>
        <VFlex xs2>
          <VTextField
            v-model.number="purchase.price"
            type="number"
            required
            :label="$t('slip.price')"
            @keyup.enter="morePurchase"
          />
        </VFlex>
        <VFlex xs2>
          <VTextField
            v-model.number="purchase.amount"
            type="number"
            required
            :label="$t('slip.amount')"
            @keyup.enter="morePurchase"
          />
        </VFlex>
      </VLayout>
      <VBtn
        fixed
        bottom
        dark
        fab
        right
        @click="more"
      >
        <VIcon>add</VIcon>
      </VBtn>
      <VBtn @click="sell">
        submit
      </VBtn>
    </VContainer>
  </VForm>
</template>

<script lang="ts">
import moment from 'moment'
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import PageHeader from '@/components/PageHeader.vue'
import PageSubHeader from '@/components/PageSubHeader.vue'
import Products from '@/stores/products'
import Publishers from '@/stores/publishers'
import Slips from '@/stores/slip/sales'
import Stocks from '@/stores/stocks'

const productModule = getModule(Products)
const publisherModule = getModule(Publishers)
const slipModule = getModule(Slips)
const stockModule = getModule(Stocks)

@Component({
  components: { PageHeader, PageSubHeader }
})
export default class SlipsView extends Vue {
  private orderedAmount = 3
  private publishMenu = false
  private slip = {
    description: '',
    number: '',
    senderId: '00000000-0000-0000-0000-000000000000',
    publishedAt: moment().format('YYYY-M-D'),
    approvedAt: moment().format('YYYY-M-D'),
    items: [{ pluCode: '', productId: '', amount: 0, price: 0 }]
  }

  get products () {
    return productModule.products
  }

  get publishers () {
    return publisherModule.publishers
  }

  browse (row: any) {
    const pluCode = row.pluCode

    stockModule.retrieveByCode(pluCode)
      .then(s => {
        row.productId = stockModule.stocks[pluCode].productId
      })
  }

  more () {
    this.slip.items.push({ pluCode: '', productId: '', amount: 0, price: 0 })
  }

  sell () {
    const slip = Object.assign({}, this.slip)

    slip.approvedAt = new Date(slip.approvedAt).toISOString()
    slip.publishedAt = new Date(slip.publishedAt).toISOString()

    slipModule.create(slip)
      .then(r => {
        this.$router.push({ name: 'slip.sales.detail', params: { id: r.identity } })
      })
  }

  created () {
    productModule.retrieve()
    publisherModule.retrieve()
  }
}
</script>
