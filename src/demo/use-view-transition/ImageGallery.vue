<template>
  <Header>
    <SlowToggler />
  </Header>

  <div
    class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 px-16"
  >
    <figure
      v-for="img in images"
      :key="img.src"
      class="m-0 cursor-pointer border-4 border-solid bg-zinc-100"
      @click="openOverlay(img)"
    >
      <img
        :ref="(el) => (img.ref = el as HTMLImageElement)"
        class="aspect-square h-auto max-w-full object-cover object-center align-top"
        :src="img.src"
      />
      <figcaption class="p-3 text-lg">{{ img.title }}</figcaption>
    </figure>
  </div>

  <div
    v-if="overlayImg"
    class="fixed inset-0 z-30 flex cursor-pointer items-center justify-center bg-black/70 p-5 [view-transition-name:overlay]"
    @click="closeOverlay"
  >
    <img
      class="aspect-square h-full w-auto object-cover object-center [view-transition-name:overlay-img]"
      :src="overlayImg!.src"
    />

    <button class="absolute right-5 top-5 h-10 w-10 !p-0 text-lg">
      &#x2715;
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useViewTransition } from '@nag5000/vue-view-transitions'

const { startViewTransition } = useViewTransition()

type ImageDef = { src: string; title: string; ref?: HTMLImageElement }

const overlayImg = ref<ImageDef | null>(null)

async function openOverlay(img: ImageDef) {
  document.documentElement.classList.add('overlay-opening')

  const imgEl = img.ref!
  imgEl.style.viewTransitionName = 'overlay-img'

  const transition = startViewTransition(() => {
    overlayImg.value = img
    imgEl.style.viewTransitionName = ''
  })

  await transition.finished
  document.documentElement.classList.remove('overlay-opening')
}

async function closeOverlay() {
  document.documentElement.classList.add('overlay-closing')

  const transition = startViewTransition(() => {
    overlayImg.value = null
  })

  await transition.finished
  document.documentElement.classList.remove('overlay-closing')
}

const images: ImageDef[] = [
  {
    src: 'https://images.unsplash.com/photo-1713096599018-9035583c05ef?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Life as an insect in the garden, bee on a flower',
  },
  {
    src: 'https://images.unsplash.com/photo-1712959670199-4bc3e645a0db?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'A dandelion that you can blow away',
  },
  {
    src: 'https://images.unsplash.com/photo-1612412656746-b2cfe535418e?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Monterey Bay Aquarium',
  },
  {
    src: 'https://images.unsplash.com/photo-1712058543394-b66184a43410?q=80&w=2975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Ashdown Forest, Uckfield, UK',
  },
  {
    src: 'https://images.unsplash.com/photo-1634237313874-bd396e96898e?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Nyhavn, Copenhagen Municipality, Denmark',
  },
  {
    src: 'https://images.unsplash.com/photo-1712979241336-66cd2129022c?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'China, Beijing, Daxing District',
  },
]
</script>

<style>
html.overlay-opening,
html.overlay-closing {
  &::view-transition-old(root) {
    display: none;
  }

  &::view-transition-new(root) {
    animation: none;
  }
}

html::view-transition-group(overlay-img) {
  z-index: 1;
}

html.overlay-closing::view-transition-old(overlay-img) {
  animation: overlay-close 0.5s;
}

@keyframes overlay-close {
  100% {
    transform: translateY(100px) scale(0.95);
    opacity: 0;
  }
}
</style>
