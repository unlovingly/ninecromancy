<template>
  <v-form ref="form">
    <page-header>{{ $t('customer.customer') }}</page-header>

    <v-text-field v-model="customer.name" :label="$t('customer.name')" required></v-text-field>

    <v-btn @click="create">submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PageHeader from "@/components/PageHeader.vue";

@Component({
  components: { PageHeader }
})
export default class CustomersView extends Vue {
  customer = {
    name: ""
  };

  create() {
    this.$store.dispatch("customerModule/create", this.customer);
  }
}
</script>