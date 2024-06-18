<template>
  <Transition
    :css="false"
    :appear="appear"
    @enter="onTransitionEnter"
    @leave="onTransitionLeave"
    @before-enter="onBeforeEnter"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { type VNode, onBeforeUnmount } from 'vue'
import { getDefaultName, scheduleViewTransition } from './utils'

const emit = defineEmits<{
  /**
   * Emitted just before `document.startViewTransition()` is called.
   */
  beforeTransition: [
    { leaveElement: Element | null; enterElement: Element | null },
  ]

  /**
   * Emitted after `document.startViewTransition()` is called, during `updateCallback` execution.
   */
  transition: [{ leaveElement: Element | null; enterElement: Element | null }]

  /**
   * Emitted after the transition is finished, once `viewTransition.finished` is resolved.
   */
  completed: [{ leaveElement: Element | null; enterElement: Element | null }]
}>()

defineSlots<{
  /**
   * Applies the same rules as for the `<Transition>` component:
   * a single element or component. If the content is a component, the component must also have only one single root element.
   * @link https://vuejs.org/guide/built-ins/transition.html#the-transition-component
   */
  default(): VNode
}>()

const props = withDefaults(
  defineProps<{
    /**
     * Defines the name of the view transition.
     * If not provided, a default unique name will be used.
     *
     * This applies `view-transition-name: ${name}` css property on the slot element during the transition.
     * Also, `view-transition-${name}` css class will be added to the `<html>` tag during the transition.
     */
    name?: string

    /**
     * Apply a transition on the initial render.
     * @link https://vuejs.org/guide/built-ins/transition#transition-on-appear
     */
    appear?: boolean
  }>(),
  {
    name: undefined,
    appear: false,
  }
)

const isSupported =
  typeof document !== 'undefined' && !!document.startViewTransition
let viewTransition: ViewTransition | null
let enterEl: Element | null = null
let leaveEl: Element | null = null
let leaveDone: (() => void) | null = null
let enterDone: (() => void) | null = null
let enterElOrigStyleDisplay: string = ''

onBeforeUnmount(() => {
  viewTransition?.skipTransition()
})

function hasStyleProperty(el: Element): el is Element & ElementCSSInlineStyle {
  return 'style' in el
}

function onBeforeEnter(el: Element) {
  if (isSupported && hasStyleProperty(el)) {
    enterElOrigStyleDisplay = el.style.display
    el.style.setProperty('display', 'none', 'important')
  }
}

async function animate() {
  const _leaveEl = leaveEl
  const _enterEl = enterEl
  const _leaveDone = leaveDone
  const _enterDone = enterDone

  enterEl = null
  leaveEl = null
  leaveDone = null
  enterDone = null

  if (!isSupported) {
    _leaveDone?.()
    _enterDone?.()

    const arg = { leaveElement: _leaveEl, enterElement: _enterEl }
    emit('beforeTransition', arg)
    emit('transition', arg)
    emit('completed', arg)
    return
  }

  const name = props.name || getDefaultName()

  document.documentElement.classList.add(
    'view-transition',
    `view-transition-${name}`
  )

  if (_leaveEl) {
    if (hasStyleProperty(_leaveEl)) {
      _leaveEl.style.viewTransitionName = name
    }

    _leaveEl.classList.add(
      'view-transition-element',
      'view-transition-leave-element'
    )
  }

  if (_enterEl) {
    if (hasStyleProperty(_enterEl)) {
      _enterEl.style.viewTransitionName = name
    }

    _enterEl.classList.add(
      'view-transition-element',
      'view-transition-enter-element'
    )
  }

  emit('beforeTransition', { leaveElement: _leaveEl, enterElement: _enterEl })

  viewTransition = await scheduleViewTransition(() => {
    _leaveDone?.()
    _enterDone?.()

    if (_enterEl && hasStyleProperty(_enterEl)) {
      _enterEl.style.display = enterElOrigStyleDisplay
      enterElOrigStyleDisplay = ''
    }

    emit('transition', { leaveElement: _leaveEl, enterElement: _enterEl })
  })

  viewTransition.finished.finally(() => {
    document.documentElement.classList.remove(
      'view-transition',
      `view-transition-${name}`
    )

    if (_leaveEl) {
      if (hasStyleProperty(_leaveEl)) {
        _leaveEl.style.viewTransitionName = ''
      }

      _leaveEl.classList.remove(
        'view-transition-element',
        'view-transition-leave-element'
      )
    }

    if (_enterEl) {
      if (hasStyleProperty(_enterEl)) {
        _enterEl.style.viewTransitionName = ''
      }

      _enterEl.classList.remove(
        'view-transition-element',
        'view-transition-enter-element'
      )
    }

    viewTransition = null
    emit('completed', { leaveElement: _leaveEl, enterElement: _enterEl })
  })
}

function onTransitionLeave(el: Element, done: () => void) {
  leaveEl = el
  leaveDone = done

  Promise.resolve().then(() => {
    if (!enterEl) {
      animate()
    }
  })
}

function onTransitionEnter(el: Element, done: () => void) {
  enterEl = el
  enterDone = done

  Promise.resolve().then(() => {
    animate()
  })
}
</script>
