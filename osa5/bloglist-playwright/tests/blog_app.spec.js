const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Teppo Testaaja',
        username: 'teppo',
        password: 'testi'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'teppo', 'testi')
  
      await expect(page.getByText('Teppo Testaaja logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'teppo', '1234')
  
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Teppo Testaaja logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'teppo', 'testi')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'playwright test blog', 'playwright-test', 'test.com')

      await expect(page.getByText('playwright test blog playwright-test')).toBeVisible()
    })

    test('a blog can be likes', async ({ page }) => {
      await createBlog(page, 'playwright test blog', 'playwright-test', 'test.com')

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('0 likes')).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1 likes')).toBeVisible() 
    })

    test('a blog can be removed', async ({ page }) => {
      await createBlog(page, 'playwright test blog', 'playwright-test', 'test.com')

      await page.getByRole('button', { name: 'view' }).click()

      page.once('dialog', async (dialog) => {
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('playwright test blog playwright-test')).not.toBeVisible()
    })
  })
})
