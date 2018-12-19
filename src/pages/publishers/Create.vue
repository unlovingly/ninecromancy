<template>
  <VForm ref="form">
    <PageHeader>{{ $t('publisher.publisher') }}</PageHeader>

    <VTextField
      v-model="publisher.name"
      :label="$t('publisher.name')"
      required
    />

    <VBtn @click="create">
      submit
    </VBtn>
  </VForm>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import PageHeader from '@/components/PageHeader.vue'
import Publishers from '@/stores/publishers'

const publisherModule = getModule(Publishers)

@Component({
  components: { PageHeader }
})
export default class CreatePublishersView extends Vue {
  publisher = {
    name: ''
  }

  create () {
    publisherModule.create(this.publisher)
  }
}
</script>
