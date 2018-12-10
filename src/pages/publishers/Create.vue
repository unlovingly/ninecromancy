<template>
  <v-form ref="form">
    <page-header>{{ $t('publisher.publisher') }}</page-header>

    <v-text-field
      v-model="publisher.name"
      :label="$t('publisher.name')"
      required
    ></v-text-field>

    <v-btn @click="create">submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { Publisher } from "@/models/Publisher";
import PageHeader from "@/components/PageHeader.vue";

export default Vue.extend({
  components: {
    PageHeader
  },
  data() {
    return {
      publisher: {
        name: ""
      }
    };
  },

  methods: {
    create(name: string) {
      this.$store.dispatch("publisherModule/create", this.publisher);
    }
  }
});
</script>
