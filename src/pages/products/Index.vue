<template>
  <v-card>
    <v-card-title>
      {{ $t('product.product') }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="products" :search="search">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.publisherId }}</td>
      </template>
      <template slot="no-data">
        <v-alert
          :value="true"
          color="warning"
          icon="priority_high"
          outline
        >みつかりません</v-alert>
      </template>
      <template slot="no-results">
        <v-alert :value="true" color="info" icon="info">{{ search }} なんてないさ</v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import * as R from "ramda";
import Vue from "vue";
import { mapState } from "vuex";
import { Publisher } from "@/models/Publisher";
import { Product } from "@/models/Product";

export default Vue.extend({
  data() {
    return {
      headers: [
        { text: this.$t("product.name"), value: "name" },
        { text: this.$t("publisher.name"), value: "publisherId" }
      ],
      search: ""
    };
  },
  computed: {
    ...mapState("productModule", ["products"]),
    ...mapState("publisherModule", ["publishers"]),
    publisher: function() {
      return this.$store.state.publishers.filter((p: Publisher) => p.id === "");
    },
    ps: function() {
      return R.map((p: Product) => {
        p;
      }, this.$store.state.products);
    }
  },
  mounted() {
    this.$store.dispatch("productModule/retrieve").then(() => {
      this.$store.dispatch("publisherModule/retrieve");
    });
  }
});
</script>
