<template>
  <v-card v-if="isNotEmpty">
    <v-card-title>
      {{ $t('shop.shop') }}
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
      :items="Object.values(shops)"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
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
import { map, merge, pluck } from "rxjs/operators";
import Vue from "vue";
import { mapState } from "vuex";
import NotFound from "@/components/NotFound.vue";

export default Vue.extend({
  components: {
    NotFound
  },
  subscriptions() {
    return {
      isNotEmpty: this.$watchAsObservable("shops").pipe(
        pluck("newValue"),
        merge(of(this.$store.state.shopModule.shops)),
        map(x => Object.values(x).length > 0)
      )
    };
  },
  data() {
    return {
      headers: [{ text: this.$t("shop.name"), value: "name" }],
      search: ""
    };
  },
  computed: {
    ...mapState("shopModule", ["shops"])
  }
});
</script>
