<template>
  <VCard v-if="isNotEmpty">
    <VCardTitle>
      {{ $t('publisher.name') }}
      <VSpacer />
      <VTextField
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
    </VCardTitle>
    <VDataTable
      :headers="headers"
      :items="Object.values(publishers)"
      :search="search"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <td>{{ props.item.name }}</td>
      </template>
    </VDataTable>
  </VCard>
  <NotFound v-else />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import NotFound from '@/components/NotFound.vue'
import i18n from '@/plugins/i18n'
import Publishers from '@/stores/publishers'

const publisherModule = getModule(Publishers)

@Component({
  components: { NotFound }
})
export default class PublishersView extends Vue {
  headers = [{ text: i18n.t('publisher.name'), value: 'name' }]
  search = ''

  get isNotEmpty () {
    return Object.values(this.publishers).length > 0
  }

  get publishers () {
    return publisherModule.publishers
  }

  created () {
    this.$store.dispatch('publisherModule/retrieve')
  }
}
</script>
