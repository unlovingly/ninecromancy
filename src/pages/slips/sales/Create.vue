<template>
  <v-form ref="form">
    <v-container>
      <page-header>{{ $t('slip.sales') }}</page-header>
      <v-layout>
        <v-flex>
          <v-menu full-width>
            <v-text-field
              slot="activator"
              :value="slip.publishedAt"
              :label="$t('slip.publishedAt')"
              readonly
            ></v-text-field>
            <v-date-picker v-model="slip.publishedAt" landscape scrollable></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <page-sub-header>{{ $t('product.product') }}</page-sub-header>
      <v-layout row v-for="(purchase, index) in slip.items" :key="index">
        <v-flex xs2>
          <v-text-field
            v-model="purchase.input"
            required
            label="PLU Code"
            @keyup.enter="browse(purchase)"
          />
        </v-flex>
        <v-flex xs6>
          <v-text-field
            :label="$t('product.name')"
            v-model="purchase.productId"
            required
            readonly
            autofocus
          />
        </v-flex>
        <v-flex xs2>
          <v-text-field
            v-model.number="purchase.price"
            type="number"
            required
            :label="$t('slip.price')"
            @keyup.enter="morePurchase"
          />
        </v-flex>
        <v-flex xs2>
          <v-text-field
            v-model.number="purchase.amount"
            type="number"
            required
            :label="$t('slip.amount')"
            @keyup.enter="morePurchase"
          />
        </v-flex>
      </v-layout>
      <v-btn fixed bottom dark fab right @click="morePurchase">
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn @click="storing">submit</v-btn>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import moment from "moment";
import * as R from "ramda";
import Vue from "vue";
import { mapState } from "vuex";
import PageHeader from "@/components/PageHeader.vue";
import PageSubHeader from "@/components/PageSubHeader.vue";

export default Vue.extend({
  components: {
    PageHeader,
    PageSubHeader
  },
  data() {
    return {
      orderedAmount: 3,
      publishMenu: false,
      slip: {
        description: "",
        number: "",
        senderId: "00000000-0000-0000-0000-000000000000",
        publishedAt: new Date().toISOString().substr(0, 10),
        approvedAt: new Date().toISOString().substr(0, 10),
        items: [{ input: "", productId: "", amount: 0, price: 0 }]
      }
    };
  },
  computed: {
    ...mapState("productModule", ["products"]),
    ...mapState("publisherModule", ["publishers"])
  },
  methods: {
    browse(purchase: any) {
      const code = purchase.input;

      this.$store.dispatch("shopModule/browse", code).then(() => {
        const stock = this.$store.getters["shopModule/browser"](
          "00000000-0000-0000-0000-000000000000",
          code
        );

        purchase.productId = stock.productId;
      });
    },
    morePurchase() {
      this.slip.items.push({ input: "", productId: "", amount: 0, price: 0 });
    },
    storing() {
      const slip = Object.assign({}, this.slip);

      slip.approvedAt = new Date(slip.approvedAt).toISOString();
      slip.publishedAt = new Date(slip.publishedAt).toISOString();

      this.$store.dispatch("slipModule/sales/create", slip);
    }
  },
  created() {
    this.$store.dispatch("publisherModule/retrieve");
    this.$store.dispatch("productModule/retrieve");
  }
});
</script>
