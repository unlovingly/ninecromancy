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
import Component from "vue-class-component";
import PageHeader from "@/components/PageHeader.vue";

@Component({
  components: { PageHeader }
})
export default class CreatePublishersView extends Vue {
  publisher = {
    name: ""
  };

  create() {
    this.$store.dispatch("publisherModule/create", this.publisher);
  }
}
</script>