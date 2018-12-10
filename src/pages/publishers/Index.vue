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
import { of } from 'rxjs'
import { map, merge, pluck } from 'rxjs/operators'
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import NotFound from '@/components/NotFound.vue'
import i18n from '@/plugins/i18n'
import Publishers from '@/stores/publishers'

const publisherModule = getModule(Publishers)

@Component({
  components: { NotFound },
  subscriptions () {
    return {
      isNotEmpty: this.$watchAsObservable('publishers').pipe(
        pluck('newValue'),
        merge(of(publisherModule.publishers)),
        map(x => Object.values(x).length > 0)
      )
    }
  }
})
export default class PublishersView extends Vue {
  headers = [{ text: i18n.t('publisher.name'), value: 'name' }]
  search = ''

  get publishers () {
    return publisherModule.publishers
  }

  created () {
    this.$store.dispatch('publisherModule/retrieve')
  }
}
</script>
