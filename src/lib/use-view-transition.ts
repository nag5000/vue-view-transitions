import { nextTick } from 'vue'

/**
 * A composable that provides View Transitions API for use in Vue components.
 *
 * @example
   ```ts
  import { ref } from 'vue'
  import { useViewTransition } from '@nag5000/vue-view-transitions'

  const { startViewTransition } = useViewTransition()
  const flag = ref(false)

  function toggle() {
    startViewTransition(() => {
      flag.value = !flag.value
    })
  }
  ```
 */
export function useViewTransition(): ViewTransitionComposable {
  return { startViewTransition }
}

function startViewTransition(
  updateCallback: () => void | Promise<void>
): ViewTransition {
  const _updateCallback = async () => {
    await updateCallback()
    await nextTick()
  }

  if (!document.startViewTransition) {
    const updateCallbackDone = Promise.resolve(updateCallback()).then(() => {})

    return {
      get ready() {
        return Promise.reject(new Error('View transitions unsupported'))
      },
      updateCallbackDone,
      finished: updateCallbackDone,
      skipTransition() {},
    }
  }

  const transition = document.startViewTransition(_updateCallback)
  return transition
}

export type ViewTransitionComposable = {
  /**
   * Starts a new view transition.
   * Mimics the original `document.startViewTransition` API.
   *
   * @param updateCallback - The callback that updates the app state or the DOM.
   *                         If browser does not support view transitions, the callback will be called immediately.
   * @returns A ViewTransition object instance.
   *          If browser does not support view transitions, this returns a stubbed ViewTransition object,
   *          where `updateCallbackDone` and `finished` are resolved immediately, and `ready` is rejected.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
   */
  startViewTransition: (
    updateCallback: () => void | Promise<void>
  ) => ViewTransition
}
