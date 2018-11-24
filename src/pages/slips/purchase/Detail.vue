<template>
  <v-list>{{ slip.number }}</v-list>
</template>

<script lang="ts">
import * as R from "ramda";
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  data() {
    return {
      headers: [
        { text: this.$t("slip.number"), value: "number" },
        { text: this.$t("slip.senderId"), value: "senderId" },
        { text: this.$t("slip.receiverId"), value: "receiverId" },
        { text: this.$t("slip.approvedAt"), value: "approvedAt" },
        { text: this.$t("slip.publishedAt"), value: "publishedAt" }
      ],
      search: ""
    };
  },
  computed: {
    ...mapState("slipDetailModule", ["slip"])
  },
  created() {
    this.$store.dispatch("slipDetailModule/detail", this.$route.params.id);
  }
});
</script>
