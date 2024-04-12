---
outline: deep
---

<script setup>
import DemoContainer from '@demo/DemoContainer.vue'
import DemoViewTransitionBasic from '@demo/view-transition/Basic.vue'
import DemoViewTransitionSlide from '@demo/view-transition/Slide.vue'
import DemoViewTransitionNotScopedYet from '@demo/view-transition/NotScopedYet.vue'
import DemoViewTransitionKey from '@demo/view-transition/Key.vue'
import DemoViewTransitionConcurrently from '@demo/view-transition/Concurrently.vue'
import DemoViewTransitionConcurrently2 from '@demo/view-transition/Concurrently2.vue'
import DemoViewTransitionConcurrentlySameName from '@demo/view-transition/ConcurrentlySameName.vue'
</script>

# `<ViewTransition>` component

The `<ViewTransition>` component provides a way to animate transition between two states using View Transitions API.

It's built on top of the built-in Vue `<Transition>` component.
So the default slot uses the same rules for its content as in the `<Transition>` component:
it only supports a single element or component as its slot content. If the content is a component, the component must also have only one single root element.

<!-- prettier-ignore-start -->
<DemoContainer>
  <DemoViewTransitionBasic />

  <template #code>

  <<< ../src/demo/view-transition/Basic.vue
  </template>
</DemoContainer>
<!-- prettier-ignore-end -->

## Transition name

The `name` property is optional and allows you to specify `view-transition-name` css property for the slot element, so you can define custom transition animations instead of using User-Agent's default cross-fade transition.
Also, `view-transition-${name}` css class is added to the `<html>` during the transition.

You can apply `view-transition-name` css property to the slot contents on your own though.

In case `name` property is not provided, `<ViewTransition>` anyway will apply unique `view-transition-name` for each transition, to ensure that the slot contents are going to be animated in a separate ViewTransition layer, not as a root layer.

<!-- prettier-ignore-start -->
<DemoContainer>
  <DemoViewTransitionSlide />

  <template #code>

  <<< ../src/demo/view-transition/Slide.vue
  </template>
</DemoContainer>
<!-- prettier-ignore-end -->

## Single child and `:key` attribute

Similar to the `<Transition>` component, `<ViewTransition>` requires a single child element or component as its slot content.
It means that you can use:

- multiple elements with `v-if/v-else-if/v-else` statements
- single element with `v-if` statement
- single element with `:key` attribute

Here is an example with `:key` attribute:

<!-- prettier-ignore-start -->
<DemoContainer>
  <DemoViewTransitionKey />

  <template #code>

  <<< ../src/demo/view-transition/Key.vue
  </template>
</DemoContainer>
<!-- prettier-ignore-end -->

## Not scoped yet

`document.startViewTransition` is designed as a document-wide transition API. It means, when you want to animate a small piece of UI in the document, the whole document will be involved in the transition anyway. And the document will be not interactive during the transition – it's by design of this API.

Scoped view transitions probably will be supported in CSS View Transitions Module Level 2 (https://github.com/w3c/csswg-drafts/issues/9890, https://www.w3.org/TR/css-view-transitions-2/), but for now, we can use a workaround to disable the root layer transition:

```css
html::view-transition-old(root) {
  display: none;
}

html::view-transition-new(root) {
  animation: none;
}
```

This way we are mimicking a scoped view transition, but still the document will be non-interactive during the transition.

Take a look at the example below. To see the difference, check/uncheck checkbox "Disable root's transition animation" and press "Toggle". When the checkbox is unchecked you should see a cross-fade animation of the bouncing ball. Don't see? Try "Toggle (slow)" then.

<!-- prettier-ignore-start -->
<DemoContainer>
  <DemoViewTransitionNotScopedYet />

  <template #code>

  <<< ../src/demo/view-transition/NotScopedYet.vue
  </template>
</DemoContainer>
<!-- prettier-ignore-end -->

## Multiple transitions

You can define multiple `<ViewTransition>` components, which can start at the same time. `<ViewTransition>` debounces `document.startViewTransition()` calls within one microtask.

<!-- prettier-ignore-start -->
<DemoContainer>
  <DemoViewTransitionConcurrently />

  <template #code>

  <<< ../src/demo/view-transition/Concurrently.vue
  </template>
</DemoContainer>
<!-- prettier-ignore-end -->

You can also define two `<ViewTransition>` components with the same `name` property. This way you achieve a moving animation.

<!-- prettier-ignore-start -->
<DemoContainer>
  <DemoViewTransitionConcurrentlySameName />

  <template #code>

  <<< ../src/demo/view-transition/ConcurrentlySameName.vue
  </template>
</DemoContainer>
<!-- prettier-ignore-end -->

## Not supported?

If the browser is not supporting View Transitions API yet, the `<ViewTransition>` component will fallback to the instant transition without animation.

## More examples

Please refer to the Examples section for more examples of using `<ViewTransition>`.

## API

### Props

- `name?: string` (default: `undefined`)

  Defines the name of the view transition.
  If not provided, a default unique name will be used.

  This applies `view-transition-name: ${name}` css property on the slot element during the transition.
  Also, `view-transition-${name}` css class will be added to the `<html>` tag during the transition.

- `appear?: boolean` (default: `false`)

  Apply a transition on the initial render.

  https://vuejs.org/guide/built-ins/transition#transition-on-appear

### Events

- `@before-transition({ leaveElement: Element | null; enterElement: Element | null })`

  Emitted just before `document.startViewTransition()` is called.

- `@transition({ leaveElement: Element | null; enterElement: Element | null })`

  Emitted after `document.startViewTransition()` is called, during `updateCallback` execution.

- `@completed({ leaveElement: Element | null; enterElement: Element | null })`

  Emitted after the transition is finished, once `viewTransition.finished` is resolved.

### Slots

- `default(): VNode`

  Applies the same rules as for the `<Transition>` component:
  a single element or component. If the content is a component, the component must also have only one single root element.

  https://vuejs.org/guide/built-ins/transition.html#the-transition-component
