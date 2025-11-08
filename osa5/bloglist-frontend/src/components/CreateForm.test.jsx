import { render, screen } from '@testing-library/react'
import CreateForm from './CreateForm'
import userEvent from '@testing-library/user-event'

test('<CreateForm /> calls createBlog with correct information', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreateForm createBlog={createBlog} />)

  const title = screen.getAllByRole('textbox')[0]
  const author = screen.getAllByRole('textbox')[1]
  const url = screen.getAllByRole('textbox')[2]
  const buttonCreate = screen.getByText('create')

  await user.type(title, 'Testblog')
  await user.type(author, 'Teppo Testaaja')
  await user.type(url, 'https://test.com')
  await user.click(buttonCreate)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Testblog',
    author: 'Teppo Testaaja',
    url: 'https://test.com',
    likes: 0
  })
})