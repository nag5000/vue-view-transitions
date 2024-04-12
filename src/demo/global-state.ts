import { ref, watchEffect } from 'vue'

const slow = ref(false)

if (typeof document !== 'undefined') {
  watchEffect(() => {
    if (slow.value) {
      document.documentElement.classList.add('slow')
    } else {
      document.documentElement.classList.remove('slow')
    }
  })
}

export { slow }
