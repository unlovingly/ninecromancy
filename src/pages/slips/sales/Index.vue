<template>
  <v-card v-if="slips">
    <v-card-title>
      {{ $t('slip.sales') }}
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
          :to="{ name: 'slip.sales.detail', params: { id: props.item.identity } }"
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
import Vue from "vue";
import Component from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import NotFound from "@/components/NotFound.vue";
import i18n from "@/plugins/i18n";
import Slips from "@/stores/slip/sales";

const slipModule = getModule(Slips);

@Component({
  components: { NotFound }
})
export default class SalesSlipsView extends Vue {
  headers = [
    { text: i18n.t("slip.number"), value: "number" },
    { text: i18n.t("slip.senderId"), value: "senderId" },
    { text: i18n.t("slip.receiverId"), value: "receiverId" },
    { text: i18n.t("slip.approvedAt"), value: "approvedAt" },
    { text: i18n.t("slip.publishedAt"), value: "publishedAt" }
  ];
  search = "";

  get slips() {
    return slipModule.slips;
  }

  created() {
    this.$store.dispatch("salesSlipModule/retrieve");
  }
}
</script>