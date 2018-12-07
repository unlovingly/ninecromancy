<template>
  <v-form ref="form">
    <v-text-field v-model="customer.name" :label="$t('customer.name')" required></v-text-field>
    <v-btn @click="create">submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { Customer } from "@/models/Customer";

export default Vue.extend({
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
