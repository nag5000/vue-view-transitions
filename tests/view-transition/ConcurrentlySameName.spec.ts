import { expect, test } from '@playwright/experimental-ct-vue'
import { spyOnViewTransition } from '../utils'
import TestComponent from './ConcurrentlySameName.vue'

test.use({ viewport: { width: 200, height: 100 } })

test('should work', async ({ page, mount }) => {
  const { waitForViewTransition } = await spyOnViewTransition(page)

  const component = await mount(TestComponent)
  await expect(component).toContainText('[A:]')

  await component.getByRole('button', { name: 'Toggle' }).click()

  await expect(component).toContainText('[:A]')

  await waitForViewTransition()
})
