<template>
  <VForm ref="form">
    <PageHeader>{{ $t('customer.customer') }}</PageHeader>

    <VTextField
      v-model="customer.name"
      :label="$t('customer.name')"
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
import Customers from '@/stores/customers'

const customerModule = getModule(Customers)

@Component({
  components: { PageHeader }
})
export default class CustomersView extends Vue {
  customer = {
    name: ''
  }

  create () {
    customerModule.create(this.customer)
  }
}
</script>
