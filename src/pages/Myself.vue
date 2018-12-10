<template>
  <v-card v-if="isNotEmpty">
    <v-card-title>{{ me.name }}</v-card-title>
  </v-card>
  <not-found v-else/>
</template>

<script lang="ts">
import { of } from "rxjs";
import { map, merge, pluck, tap } from "rxjs/operators";
import Vue from "vue";
import { mapState } from "vuex";
import NotFound from "@/components/NotFound.vue";
import { Shop } from "@/models/Shop";

export default Vue.extend({
  components: {
    NotFound
  },
  data() {
    return {};
  },
  subscriptions() {
    return {
      isNotEmpty: this.$watchAsObservable("me").pipe(
        pluck("newValue"),
        merge(of(this.$store.state.publisherModule.publishers)),
        map(x => Object.values(x).length > 0)
      )
    };
  },
  computed: {
    me(): Shop {
      return this.$store.getters["shopModule/show"](
        "00000000-0000-0000-0000-000000000000"
      );
    }
  },
  created() {
    this.$store.dispatch(
      "shopModule/show",
      "00000000-0000-0000-0000-000000000000"
    );
  }
});
</script>
