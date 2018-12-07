<template>
  <v-card v-if="isNotEmpty">
    <v-card-title>
      {{ $t('slip.storing') }}
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
      :items="Object.values(slips)"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <router-link
          tag="tr"
          :to="{ name: 'slip.purchase.detail', params: { id: props.item.identity } }"
        >
          <td>{{ props.item.number }}</td>
          <td>{{ props.item.senderId }}</td>
          <td>{{ props.item.receiverId }}</td>
          <td>{{ props.item.approvedAt }}</td>
          <td>{{ props.item.publishedAt }}</td>
        </router-link>
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
import { map, pluck } from "rxjs/operators";
import Vue from "vue";
import { mapState } from "vuex";
import NotFound from "@/components/NotFound.vue";

export default Vue.extend({
  components: {
    NotFound
  },
  data() {
    return {
      headers: [
        { text: this.$t("slip.number"), value: "number" },
        { text: this.$t("slip.senderId"), value: "senderId" },
        { text: this.$t("slip.receiverId"), value: "receiverId" },
        { text: this.$t("slip.approvedAt"), value: "approvedAt" },
        { text: this.$t("slip.publishedAt"), value: "publishedAt" }
      ],
      search: ""
    };
  },
  subscriptions() {
    return {
      isNotEmpty: this.$watchAsObservable("slips").pipe(
        pluck("newValue"),
        map(x => Object.values(x).length > 0)
      )
    };
  },
  computed: {
    ...mapState("slipModule/purchase", ["slips"])
  },
  created() {
    this.$store.dispatch("slipModule/purchase/retrieve");
  }
});
</script>
