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
    <v-data-table
      :headers="headers"
      :items="Object.values(stocks)"
      :search="searchText"
    >
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
import { Observable, Subject } from "rxjs";
import { concatMap, filter, map, pluck, throttleTime } from "rxjs/operators";
import Vue from "vue";
import Component from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import i18n from "@/plugins/i18n";
import Stocks from "@/stores/stocks";

const stockModule = getModule(Stocks);

@Component({
  subscriptions() {
    return {
      inquire: this.$watchAsObservable("shops").pipe(
        map(o => o.newValue),
        filter(q => q.length > 2),
        throttleTime(750),
        concatMap(q => this.$store.dispatch("stockModule/retrieve", q))
      )
    };
  }
})
export default class ShopsView extends Vue {
  headers = [
    { text: i18n.t("shop.stocks.pluCode"), value: "pluCode" },
    { text: i18n.t("shop.shop"), value: "shopId" },
    { text: i18n.t("product.product"), value: "productId" },
    { text: i18n.t("shop.stocks.price"), value: "price" },
    { text: i18n.t("shop.stocks.amount"), value: "amount" }
  ];
  searchText = "";

  get stocks() {
    return stockModule.stocks;
  }
}
</script>