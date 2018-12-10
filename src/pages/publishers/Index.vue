<template>
  <v-card v-if="isNotEmpty">
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
    <v-data-table
      :headers="headers"
      :items="Object.values(publishers)"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
      </template>
    </v-data-table>
  </v-card>
  <not-found v-else/>
</template>

<script lang="ts">
import { of } from "rxjs";
import { map, merge, pluck, tap } from "rxjs/operators";
import Vue from "vue";
import Component from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import NotFound from "@/components/NotFound.vue";
import i18n from "@/plugins/i18n";
import Publishers from "@/stores/publishers";

const publisherModule = getModule(Publishers);

@Component({
  components: { NotFound },
  subscriptions() {
    return {
      isNotEmpty: this.$watchAsObservable("publishers").pipe(
        pluck("newValue"),
        merge(of(publisherModule.publishers)),
        map(x => Object.values(x).length > 0)
      )
    };
  }
})
export default class PublishersView extends Vue {
  headers = [{ text: i18n.t("publisher.name"), value: "name" }];
  search = "";

  get publishers() {
    return publisherModule.publishers;
  }

  created() {
    this.$store.dispatch("publisherModule/retrieve");
  }
}
</script>