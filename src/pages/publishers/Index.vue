<template>
  <v-card>
    <v-card-title>
      {{ $t('publisher.name') }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="publishers" :search="search">
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
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  data() {
    return {
      headers: [{ text: this.$t("publisher.name"), value: "name" }],
      search: ""
    };
  },
  computed: {
    ...mapState("publisherModule", ["publishers"])
  },
  created() {
    this.$store.dispatch("publisherModule/retrieve");
  }
});
</script>
