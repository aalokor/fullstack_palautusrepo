const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, addUser } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await addUser(request, 'Teppo Testaaja', 'teppo', 'testi')
    await addUser(request, 'Rottaperuna', 'rotta', 'peruna')
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
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

    test('remove button is visible to the user who added the blog', async ({ page }) => {
      await createBlog(page, 'playwright test blog', 'playwright-test', 'test.com')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
    })

    test('remove button is not visible to a user who did not add the blog', async ({ page }) => {
      await createBlog(page, 'playwright test blog', 'playwright-test', 'test.com')
      await page.getByRole('button', { name: 'logout' }).click()
      
      await loginWith(page, 'rotta', 'peruna')
      
      await expect(page.getByText('playwright test blog playwright-test')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are ordered in descending order based on likes', async ({ page }) => {
      await createBlog(page, 'Blog 1', 'Testi', 'test.com')
      await createBlog(page, 'Blog 2', 'Testi', 'test.com')
      await createBlog(page, 'Blog 3', 'Testi', 'test.com')

      page.getByText('Blog 1')
        .getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1 likes')).toBeVisible()
      await page.getByRole('button', { name: 'hide' }).click()

      page.getByText('Blog 3')
        .getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1 likes')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('2 likes')).toBeVisible()
      await page.getByRole('button', { name: 'hide' }).click()

      await page.waitForTimeout(500)

      const blogs = await page.locator('.blog').allTextContents()
      expect(blogs[0]).toContain('Blog 3 Testi')
      expect(blogs[1]).toContain('Blog 1 Testi')
      expect(blogs[2]).toContain('Blog 2 Testi')
    })
  })
})
