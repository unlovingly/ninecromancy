<template>
  <v-form ref="form">
    <page-header>{{ $t('customer.customer') }}</page-header>

    <v-text-field v-model="customer.name" :label="$t('customer.name')" required></v-text-field>

    <v-btn @click="create">submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { Customer } from "@/models/Customer";
import PageHeader from "@/components/PageHeader.vue";

export default Vue.extend({
  components: {
    PageHeader
  },
  data() {
    return {
      customer: {
        name: ""
      }
    };
  },

  methods: {
    create(name: string) {
      this.$store.dispatch("customerModule/create", this.customer);
    }
  }
});
</script>
