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
import PageHeader from '@/components/PageHeader.vue'

@Component({
  components: { PageHeader }
})
export default class CustomersView extends Vue {
  customer = {
    name: ''
  }

  create () {
    this.$store.dispatch('customerModule/create', this.customer)
  }
}
</script>
