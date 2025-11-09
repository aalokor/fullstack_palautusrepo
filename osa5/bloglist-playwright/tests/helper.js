const loginWith = async (page, username, password)  => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()

  const textboxes = await page.getByRole('textbox').all()
  await textboxes[0].fill(title)
  await textboxes[1].fill(author)
  await textboxes[2].fill(url)

  await page.getByRole('button', { name: 'create' }).click()
}

const addUser = async (request, name, username, password) => {
  await request.post('/api/users', {
    data: {
      name: name,
      username: username,
      password: password
    }
  })
}

export { loginWith, createBlog, addUser }