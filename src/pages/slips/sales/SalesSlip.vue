<template>
  <v-form ref="form">
    <v-card>
      <v-container>
        <page-header>{{ $t('slip.sales') }}</page-header>
        <v-layout row v-for="i in orderedAmount" :key="i">
          <v-flex xs10>
            <v-autocomplete
              :items="products"
              :label="$t('product.name')"
              item-text="name"
              item-value="id"
              required
            />
          </v-flex>
          <v-flex xs2>
            <v-text-field
              single-line
              type="number"
              required
              :label="$t('slip.amount')"
            />
          </v-flex>
        </v-layout>
        <v-btn fixed bottom dark fab right @click="morePurchase">
          <v-icon>add</v-icon>
        </v-btn>
      </v-container>
    </v-card>
    <v-btn>submit</v-btn>
  </v-form>
</template>

<script lang="ts">
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
      orderedAmount: 3
    };
  },
  computed: {
    ...mapState("productModule", ["products"]),
    ...mapState("publisherModule", ["publishers"])
  },
  methods: {
    morePurchase() {
      this.orderedAmount += 1;
    }
  }
});
</script>
