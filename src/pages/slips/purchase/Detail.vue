<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex>
        <v-card flat>
          <v-card-title primary-title>
            <page-header>{{ showing.identity }}</page-header>
            {{ showing.senderId }} / {{ showing.number }}
            {{ showing.publishedAt }}
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
        <v-data-table
          item-key="identity"
          :headers="headers"
          :items="showing.items"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.productId }}</td>
            <td>{{ props.item.amount }}</td>
            <td>{{ props.item.price }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import * as R from "ramda";
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
import { Slip } from "@/models/slip/Purchase";
import PageHeader from "@/components/PageHeader.vue";
import PageSubHeader from "@/components/PageSubHeader.vue";

export default Vue.extend({
  components: {
    PageHeader,
    PageSubHeader
  },
  data() {
    return {
      headers: [
        { text: this.$t("product.product"), value: "productId" },
        { text: this.$t("slip.amount"), value: "amount" },
        { text: this.$t("slip.price"), value: "price" }
      ],
      search: ""
    };
  },
  computed: {
    ...mapState("slipModule/purchase", ["slips"]),
    showing(): Slip {
      return this.$store.getters["slipModule/purchase/show"](this.id);
    }
  },
  created() {
    this.$store.dispatch("slipModule/purchase/show", this.id);
  },
  props: {
    id: String
  }
});
</script>
