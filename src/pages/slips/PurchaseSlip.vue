<template>
  <v-form ref="form">
    <v-container>
      <page-header>{{ $t('slip.storing') }}</page-header>
      <v-layout>
        <v-flex xs6>
          <v-text-field
            :label="$t('slip.number')"
            v-model="slip.number"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-autocomplete
            :items="publishers"
            :label="$t('publisher.name')"
            item-text="name"
            item-value="id"
            v-model="slip.publisherId"
            required
          />
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-text-field
            v-model="slip.description"
            :label="$t('slip.description')"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs6>
          <v-menu full-width>
            <v-text-field
              slot="activator"
              :value="publishedAt"
              :label="$t('slip.publishedAt')"
              readonly
            ></v-text-field>
            <v-date-picker v-model="slip.publishedAt" landscape scrollable></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs6>
          <v-menu full-width>
            <v-text-field
              slot="activator"
              :value="approvedAt"
              :label="$t('slip.approvedAt')"
              readonly
            ></v-text-field>
            <v-date-picker v-model="slip.approvedAt" landscape scrollable></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <page-sub-header>{{ $t('product.product') }}</page-sub-header>
      <v-layout row v-for="(purchase, index) in purchases" :key="index">
        <v-flex xs10>
          <v-autocomplete
            :items="products"
            :label="$t('product.name')"
            v-model="purchase.id"
            item-text="name"
            item-value="id"
            required
          />
        </v-flex>
        <v-flex xs2>
          <v-text-field
            single-line
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
      <v-btn @click="storing(slip, purchases)">submit</v-btn>
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
        publisherId: "",
        publishedAt: new Date().toISOString().substr(0, 10),
        approvedAt: new Date().toISOString().substr(0, 10)
      },
      purchases: [{ id: "", amount: 0 }]
    };
  },
  computed: {
    ...mapState("productModule", ["products"]),
    ...mapState("publisherModule", ["publishers"]),
    approvedAt: function() {
      return moment(this.slip.approvedAt).format("Y/MM/DD");
    },
    publishedAt: function() {
      return moment(this.slip.publishedAt).format("Y/MM/DD");
    }
  },
  methods: {
    morePurchase() {
      this.purchases.push({ id: "", amount: 0 });
    },
    storing(s: any, p: any) {
      console.log(s);
    }
  }
});
</script>
