<template>
  <v-card v-if="isNotEmpty">
    <v-card-title>
      {{ $t('customer.name') }}
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
      :items="Object.values(customers)"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
      </template>
      <template slot="no-data">
        <v-alert color="warning" icon="priority_high" outline>みつかりません</v-alert>
      </template>
      <template slot="no-results">
        <v-alert color="info" icon="info">{{ search }} なんてないさ</v-alert>
      </template>
    </v-data-table>
  </v-card>
  <not-found v-else/>
</template>

<script lang="ts">
import { of } from "rxjs";
import { map, merge, pluck } from "rxjs/operators";
import Vue from "vue";
import { mapState } from "vuex";
import NotFound from "@/components/NotFound.vue";

export default Vue.extend({
  components: {
    NotFound
  },
  data() {
    return {
      headers: [{ text: this.$t("customer.name"), value: "name" }],
      search: ""
    };
  },
  subscriptions() {
    return {
      isNotEmpty: this.$watchAsObservable("customers").pipe(
        pluck("newValue"),
        merge(of(this.$store.state.customerModule.customers)),
        map(x => Object.values(x).length > 0)
      )
    };
  },
  computed: {
    ...mapState("customerModule", ["customers"])
  },
  created() {
    this.$store.dispatch("customerModule/retrieve");
  }
});
</script>
