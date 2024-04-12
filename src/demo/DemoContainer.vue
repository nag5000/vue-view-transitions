<template>
  <div class="demo-container" :class="{ 'has-code': hasSourceCode }">
    <div class="demo">
      <div
        ref="headerRef"
        class="absolute left-5 right-5 top-5 flex items-center gap-4 whitespace-nowrap"
      ></div>

      <div
        class="demo-contents flex flex-1 flex-col items-center justify-center text-8xl [&_span]:inline-block"
      >
        <slot />
      </div>

      <span
        v-if="!isViewTransitionsAPISupported"
        class="absolute bottom-2 px-4 font-medium text-red-500"
      >
        No animation: your browser does not support the View Transitions
        API.
        <a href="https://caniuse.com/view-transitions" target="_blank"
          >Can I use</a
        >
      </span>
    </div>

    <button
      v-if="hasSourceCode"
      class="toggle-code-btn bg-[var(--vp-code-block-bg)] px-6 pt-5 text-start font-mono text-sm"
      :class="{ 'pb-5': !showSourceCode }"
      :data-open="showSourceCode"
      @click="toggleSourceCode"
    >
      <span class="inline-block -translate-y-px">{{
        showSourceCode ? '▼' : '▶'
      }}</span>
      Source code
    </button>

    <div v-if="hasSourceCode && showSourceCode" class="demo-code">
      <slot name="code" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, useSlots } from 'vue'
import { slow } from './global-state'

const headerRef = ref(null)
provide('header', headerRef)

const isViewTransitionsAPISupported =
  typeof document !== 'undefined' && !!document?.startViewTransition

slow.value = false

const showSourceCode = ref(false)

function toggleSourceCode() {
  showSourceCode.value = !showSourceCode.value
}

const slots = useSlots()
const hasSourceCode = computed(() => !!slots.code)
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  margin: 16px -24px 42px;
}

.demo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1rem 3rem;
  background-color: #ddd0ef;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239f92ac' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-position: 7px 7px;
}

.demo:deep(button) {
  background-color: aliceblue;
  color: rgba(60, 60, 67);
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  font-size: 18px;
  cursor: auto;
  border: 2px solid #a37ed8;
  box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.2);
  line-height: normal;

  &:active {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    translate: 2px 2px;
  }
}

.demo:deep(label) {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  font-size: 18px;
  color: rgba(60, 60, 67);
}

.demo:deep(input[type='checkbox']) {
  width: 16px;
  height: 16px;
  accent-color: #a37ed8;
  outline: revert;
}

.demo:deep(select) {
  accent-color: #a37ed8;
  outline: revert;
  appearance: revert;
  padding: 0.4rem 0.2rem;
  border-radius: 6px;
  border: 2px solid #a37ed8;
  font-size: 16px;
  background-color: aliceblue;
}

.demo-code:deep(> :first-child) {
  margin: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.demo:deep(details) {
  @apply max-w-fit bg-zinc-100 px-2 py-1 text-base;

  &[open] {
    @apply shadow-lg;
  }

  & > summary {
    @apply cursor-pointer underline decoration-dashed decoration-1 underline-offset-4;
  }

  & > p {
    @apply mx-3 my-1;
  }
}

@media (min-width: 640px) {
  .demo-container {
    margin: 16px 0px 54px;
  }

  .demo {
    padding: 6rem 1rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .toggle-code-btn[data-open='false'] {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .demo-container:not(.has-code) .demo {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
</style>
