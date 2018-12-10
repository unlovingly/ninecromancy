<template>
  <v-form ref="form">
    <v-text-field v-model="name" :label="$t('shop.name')" required></v-text-field>
    <v-btn @click="create(name)">submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PageHeader from "@/components/PageHeader.vue";

@Component({
  components: { PageHeader }
})
export default class CreateShopView extends Vue {
  shop = {
    name: ""
  };

  create() {
    this.$store.dispatch("shopModule/create", this.shop);
  }
}
</script>