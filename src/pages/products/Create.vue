<template>
  <v-form>
    <v-text-field
      v-model="name"
      :label="$t('name')"
      required
    ></v-text-field>

    <v-combobox
      v-model="publisher"
      :items="publishers"
      item-text="name"
      item-value="id"
      :label="$t('publisher.name')"
      required
    />

    <v-btn
      :disabled="!valid"
      @click="create"
    >
      submit
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import * as R from "ramda";
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  data() {
    return {
      name: "",
      publisher: null
    };
  },

  computed: {
    valid: function() {
      // TODO
      return !R.isEmpty(this.name) && !R.isNil(this.publisher);
    },
    ...mapState("publisherModule", ["publishers"])
  },

  methods: {
    create() {
      this.$store.dispatch("productModule/create");
    }
  }
});
</script>
