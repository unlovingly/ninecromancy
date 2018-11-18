<template>
  <v-form ref="form">
    <v-text-field
      v-model="name"
      label="Name"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import * as R from "ramda";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      name: ""
    };
  },

  computed: {
    valid: function() {
      return !R.isEmpty(this.name);
    }
  },

  methods: {
    submit() {}
  }
});
</script>
