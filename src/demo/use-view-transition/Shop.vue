<template>
  <Header>
    <SlowToggler />
  </Header>

  <div class="flex gap-4">
    <ul class="!m-0 list-none !p-0">
      <li
        v-for="item in items"
        :key="item"
        class="relative m-3 inline-block border-2 border-solid bg-zinc-100 p-4"
        @click="addToCart(item)"
      >
        <span
          :class="{
            '[view-transition-name:item]': viewTransitionThing === item,
          }"
        >
          {{ item }}
        </span>

        <button class="absolute -bottom-2 -right-2">+</button>
      </li>
    </ul>

    <div class="relative mr-8 flex flex-col gap-4">
      <div
        :class="{
          '[view-transition-name:cart]': viewTransitionThing === 'cart',
        }"
      >
        <span class="text-9xl">🛒</span>

        <div class="absolute -top-2 left-4 grid text-7xl">
          <span
            v-for="item in cart"
            :key="item"
            class="col-span-full row-span-full"
            :class="{
              'last:[view-transition-name:item]':
                viewTransitionThing === 'cart-' + item,
            }"
          >
            {{ item }}
          </span>
        </div>

        <span
          class="absolute -right-3 -top-3 rounded-full bg-white px-4 text-2xl"
        >
          {{ cart.length }}
        </span>
      </div>

      <button v-if="cart.length" @click="buy">Buy</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { useViewTransition } from '@nag5000/vue-view-transitions'

const { startViewTransition } = useViewTransition()

// prettier-ignore
const items = ref([
  '🍎', '🍐', '🍊', '🍋', '🍉',
  '🍓', '🍒', '🥑', '🍖', '🍭'
])

const cart = ref<string[]>([])
const viewTransitionThing = ref('')

async function addToCart(item: string) {
  viewTransitionThing.value = item
  await nextTick()

  const transition = startViewTransition(() => {
    cart.value.push(item)
    viewTransitionThing.value = 'cart-' + item
  })

  await transition.finished
  viewTransitionThing.value = ''
}

async function buy() {
  viewTransitionThing.value = 'cart'
  const transition = startViewTransition(() => {
    cart.value = []
  })

  await transition.finished
  viewTransitionThing.value = ''
}
</script>

<style>
html::view-transition-group(item) {
  animation-duration: 0.8s;
}

html::view-transition-old(cart) {
  animation: cart-out 0.8s;
}

html::view-transition-new(cart) {
  animation: cart-in 0.8s;
}

@keyframes cart-out {
  to {
    transform: translateX(200px);
    opacity: 0;
  }
}

@keyframes cart-in {
  from {
    transform: translateX(-200px);
    opacity: 0;
  }
}
</style>
