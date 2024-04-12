import { expect, test } from '@playwright/experimental-ct-vue'
import { spyOnViewTransition } from '../utils'
import TestComponent from './ListReverse.vue'

test.use({ viewport: { width: 200, height: 400 } })

test('should work', async ({ page, mount }) => {
  const { waitForViewTransition } = await spyOnViewTransition(page)

  const component = await mount(TestComponent)
  await expect(component).toContainText('123456')

  await component.getByRole('button', { name: 'Reverse' }).click()

  await expect(component).toContainText('654321')

  await waitForViewTransition()
})
