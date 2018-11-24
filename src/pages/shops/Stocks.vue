<template>
  <v-card>
    <v-card-title>
      {{ $t('shop.stocks.stocks') }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchText"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="stocks" :search="searchText">
      <template slot="items" slot-scope="props">
        <td
          v-for="(header, index) in headers"
          :key="index"
        >{{ props.item[header.value] }}</td>
      </template>
      <template slot="no-data">there is nothing here</template>
      <template slot="no-results">
        <v-alert :value="true" color="info" icon="info">{{ searchText }} なんてないさ</v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import * as R from "ramda";
import { Observable, Subject } from "rxjs";
import { concatMap, filter, map, pluck, throttleTime } from "rxjs/operators";
import Vue from "vue";
import { mapState } from "vuex";
import { Shop } from "@/models/Shop";

export default Vue.extend({
  data() {
    return {
      headers: [
        { text: this.$t("shop.stocks.pluCode"), value: "pluCode" },
        { text: this.$t("shop.shop"), value: "shopId" },
        { text: this.$t("product.product"), value: "productId" },
        { text: this.$t("shop.stocks.price"), value: "price" },
        { text: this.$t("shop.stocks.amount"), value: "amount" }
      ],
      searchText: ""
    };
  },

  subscriptions: function() {
    return {
      search: this.$watchAsObservable("searchText").pipe(
        map(o => o.newValue),
        filter(q => q.length > 2),
        throttleTime(750),
        concatMap(q => this.$store.dispatch("stockModule/retrieve", q))
      )
    };
  },

  computed: {
    ...mapState("stockModule", ["stocks"])
  }
});
</script>
