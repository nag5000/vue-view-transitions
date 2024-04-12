import { type Page } from 'playwright-core'

declare global {
  interface Window {
    __viewTransition?: ViewTransition
  }
}

export async function spyOnViewTransition(page: Page) {
  await page.evaluate(() => {
    if (!document.startViewTransition) {
      return
    }

    const orig = document.startViewTransition
    function startViewTransitionSpy() {
      const viewTransition = orig.apply(
        document,
        // eslint-disable-next-line prefer-rest-params
        arguments as never
      ) as ViewTransition

      window.__viewTransition = viewTransition
      return viewTransition
    }

    document.startViewTransition = startViewTransitionSpy
  })

  return {
    waitForViewTransition: () =>
      page.evaluate(() => window.__viewTransition?.finished),
  }
}
