<template>
  <v-form>
    <page-header>{{ $t('product.product') }}</page-header>

    <v-text-field v-model="product.name" :label="$t('product.name')" required></v-text-field>

    <v-autocomplete
      v-model="product.publisherId"
      :items="Object.values(publishers)"
      item-text="name"
      :label="$t('publisher.name')"
      item-value="id"
      required
    />

    <v-btn @click="create">submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Publisher } from "@/models/Publisher";
import { Product } from "@/models/Product";
import PageHeader from "@/components/PageHeader.vue";
import PageSubHeader from "@/components/PageSubHeader.vue";

export default Vue.extend({
  components: {
    PageHeader,
    PageSubHeader
  },
  data() {
    return {
      product: {
        name: "",
        publisherId: ""
      }
    };
  },

  computed: {
    ...mapState("publisherModule", ["publishers"])
  },

  created() {
    this.$store.dispatch("publisherModule/retrieve");
  },

  methods: {
    create(name: string, publisher: Publisher) {
      this.$store.dispatch("productModule/create", this.product);
    }
  }
});
</script>
