<template>
  <v-container grid-list-md v-if="showing">
    <v-layout row>
      <v-flex>
        <v-card flat>
          <v-card-title primary-title>
            <page-header>{{ showing.identity }}</page-header>
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
  <not-found v-else/>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
import { Slip } from "@/models/slip/Purchase";
import NotFound from "@/components/NotFound.vue";
import PageHeader from "@/components/PageHeader.vue";
import PageSubHeader from "@/components/PageSubHeader.vue";

export default Vue.extend({
  components: {
    NotFound,
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
    ...mapState("slipModule/sales", ["slips"]),
    showing(): Slip {
      return this.$store.getters["slipModule/sales/show"](this.id);
    }
  },
  created() {
    this.$store.dispatch("slipModule/sales/show", this.id);
  },
  props: {
    id: String
  }
});
</script>
