<template>
  <v-form>
    <v-text-field v-model="product.name" :label="$t('product.name')" required></v-text-field>

    <v-autocomplete
      v-model="product.publisherId"
      :items="publishers"
      item-text="name"
      :label="$t('publisher.name')"
      item-value="id"
      required
    />

    <v-btn @click="create">submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Publisher } from "@/models/Publisher";
import { Product } from "@/models/Product";

export default Vue.extend({
  data() {
    return {
      product: {
        name: "",
        publisherId: ""
      }
    };
  },

  computed: {
    ...mapState("publisherModule", ["publishers"])
  },

  created() {
    this.$store.dispatch("publisherModule/retrieve");
  },

  methods: {
    create(name: string, publisher: Publisher) {
      this.$store.dispatch("productModule/create", this.product);
    }
  }
});
</script>
