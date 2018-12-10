<template>
  <v-card v-if="isNotEmpty">
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
    <v-data-table
      :headers="headers"
      :items="Object.values(products)"
      :search="search"
    >
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
  <not-found v-else/>
</template>

<script lang="ts">
import { of } from "rxjs";
import { map, merge, pluck, tap } from "rxjs/operators";
import Vue from "vue";
import Component from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import NotFound from "@/components/NotFound.vue";
import i18n from "@/plugins/i18n";
import Products from "@/stores/products";
import Publishers from "@/stores/publishers";

const productModule = getModule(Products);
const publisherModule = getModule(Publishers);

@Component({
  components: { NotFound },
  subscriptions() {
    return {
      isNotEmpty: this.$watchAsObservable("products").pipe(
        pluck("newValue"),
        merge(of(productModule.products)),
        map(x => Object.values(x).length > 0)
      )
    };
  }
})
export default class ProductsView extends Vue {
  headers = [
    { text: i18n.t("product.name"), value: "name" },
    { text: i18n.t("publisher.name"), value: "publisherId" }
  ];
  search = "";

  get products() {
    return productModule.products;
  }

  get publishers() {
    return publisherModule.publishers;
  }

  created() {
    this.$store.dispatch("productModule/retrieve").then(() => {
      const keys = Object.values(productModule.products).map(
        p => p.publisherId
      );

      this.$store.dispatch("publisherModule/retrieveByKeys", keys);
    });
  }
}
</script>