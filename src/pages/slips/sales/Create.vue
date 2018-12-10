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
            v-model="purchase.input"
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
export default class SlipsView extends Vue {
  private orderedAmount = 3
  private publishMenu = false
  private slip = {
    description: '',
    number: '',
    senderId: '',
    receiverId: '00000000-0000-0000-0000-000000000000',
    publishedAt: new Date().toISOString().substr(0, 10),
    approvedAt: new Date().toISOString().substr(0, 10),
    items: [{ productId: '', amount: 0, price: 0 }]
  }

  get products () {
    return productModule.products
  }

  get publishers () {
    return publisherModule.publishers
  }

  browse (row: any) {
    const pluCode = row.input

    this.$store.dispatch('stockModule/retrieveByCode', pluCode).then(() => {
      const stock = this.$store.getters['stockModule/show'](pluCode)

      row.productId = stock.productId
    })
  }

  more () {
    this.slip.items.push({ productId: '', amount: 0, price: 0 })
  }

  sell () {
    const slip = Object.assign({}, this.slip)

    slip.approvedAt = new Date(slip.approvedAt).toISOString()
    slip.publishedAt = new Date(slip.publishedAt).toISOString()

    this.$store.dispatch('salesSlipModule/create', slip).then(id => {
      this.$router.push({ name: 'slip.purchase.detail', params: { id: id } })
    })
  }

  created () {
    this.$store.dispatch('productModule/retrieve')
    this.$store.dispatch('publisherModule/retrieve')
  }
}
</script>
