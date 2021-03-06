<template>
  <VForm ref="form">
    <VContainer>
      <PageHeader>{{ $t('slip.storing') }}</PageHeader>
      <VLayout>
        <VFlex xs6>
          <VTextField
            v-model="slip.number"
            :label="$t('slip.number')"
            required
          />
        </VFlex>
        <VFlex xs6>
          <VAutocomplete
            v-model="slip.senderId"
            :items="Object.values(publishers)"
            :label="$t('publisher.name')"
            item-text="name"
            item-value="identity"
            required
          />
        </VFlex>
      </VLayout>
      <VLayout>
        <VFlex>
          <VTextField
            v-model="slip.description"
            :label="$t('slip.description')"
            required
          />
        </VFlex>
      </VLayout>
      <VLayout>
        <VFlex xs6>
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
        <VFlex xs6>
          <VMenu full-width>
            <VTextField
              slot="activator"
              :value="slip.approvedAt"
              :label="$t('slip.approvedAt')"
              readonly
            />
            <VDatePicker
              v-model="slip.approvedAt"
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
        <VFlex xs8>
          <VAutocomplete
            v-model="purchase.productId"
            :items="Object.values(products)"
            :label="$t('product.name')"
            item-text="name"
            item-value="identity"
            required
            autofocus
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
      <VBtn @click="storing">
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
import Slips from '@/stores/slip/purchase'

const productModule = getModule(Products)
const publisherModule = getModule(Publishers)
const slipModule = getModule(Slips)

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
    publishedAt: moment().format('YYYY-M-D'),
    approvedAt: moment().format('YYYY-M-D'),
    items: [{ productId: '', amount: 0, price: 0 }]
  }

  get products () {
    return productModule.products
  }

  get publishers () {
    return publisherModule.publishers
  }

  more () {
    this.slip.items.push({ productId: '', amount: 0, price: 0 })
  }

  storing () {
    const slip = Object.assign({}, this.slip, {
      approvedAt: new Date(this.slip.approvedAt).toISOString(),
      publishedAt: new Date(this.slip.publishedAt).toISOString()
    })

    slipModule.create(slip)
      .then(r => {
        this.$router.push({ name: 'slip.purchase.detail', params: { id: r.identity } })
      })
  }

  created () {
    productModule.retrieve()
    publisherModule.retrieve()
  }
}
</script>
