let unnamedUid = 0

export function getDefaultName() {
  return 'unnamed' + unnamedUid++
}

let viewTransition: ViewTransition | null = null
let callbackQueue: (() => void | Promise<void>)[] = []

export async function scheduleViewTransition(
  updateCallback: () => void | Promise<void>
) {
  callbackQueue.push(updateCallback)

  await Promise.resolve()

  return viewTransition ?? (viewTransition = startViewTransition())
}

function startViewTransition() {
  return document.startViewTransition(async () => {
    const queue = callbackQueue
    callbackQueue = []
    viewTransition = null
    await Promise.all(queue.map((cb) => cb()))
  })
}
