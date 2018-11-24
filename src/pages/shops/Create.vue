<template>
  <v-form ref="form">
    <v-text-field v-model="name" :label="$t('shop.name')" required></v-text-field>
    <v-btn :disabled="!valid" @click="create(name)">submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import * as R from "ramda";
import Vue from "vue";
import { Shop } from "@/models/Shop";

export default Vue.extend({
  data() {
    return {
      name: ""
    };
  },

  computed: {
    valid: function() {
      return !R.isEmpty(this.name);
    }
  },

  methods: {
    create(name: string) {
      this.$store.dispatch("shopModule/create", new Shop(undefined, name, []));
    }
  }
});
</script>
