<script lang="ts" setup>
import { type Component, computed, ref } from 'vue'
import DemoContainer from './DemoContainer.vue'

const demoComponents = import.meta.glob(
  ['./use-view-transition/**/*.vue', './view-transition/**/*.vue'],
  {
    import: 'default',
    eager: true,
  }
) as Record<string, Component>

const selectedOptionsQueryParam = location.search.match(/\?s=([^&]+)/)
const selectedOptions = ref(
  selectedOptionsQueryParam
    ? decodeURIComponent(selectedOptionsQueryParam[1]).split(',')
    : ['all']
)

const selectedComponents = computed<Record<string, Component>>(() => {
  if (selectedOptions.value.includes('all')) {
    return demoComponents
  }

  return selectedOptions.value.reduce(
    (acc, path) => {
      acc[path] = demoComponents[path]
      return acc
    },
    {} as Record<string, Component>
  )
})

function updateQueryParam() {
  const queryParams = new URLSearchParams(location.search)
  if (selectedOptions.value.includes('all')) {
    queryParams.delete('s')
  } else {
    queryParams.set('s', selectedOptions.value.join(','))
  }

  history.replaceState(null, '', `?${queryParams}`)
}
</script>

<template>
  <details class="text-lg" open>
    <summary>Select components to display</summary>

    <select
      v-model="selectedOptions"
      multiple
      :size="Object.keys(demoComponents).length + 1"
      class="text-lg"
      @change="updateQueryParam"
    >
      <option value="all" selected>All</option>

      <option
        v-for="(_component, path) in demoComponents"
        :key="path"
        :value="path"
      >
        {{ path }}
      </option>
    </select>
  </details>

  <div v-for="(component, path) in selectedComponents" :key="path">
    <h2>{{ path }}</h2>
    <DemoContainer>
      <component :is="component" />
    </DemoContainer>
  </div>
</template>
