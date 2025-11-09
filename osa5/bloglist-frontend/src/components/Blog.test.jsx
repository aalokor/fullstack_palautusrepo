import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'

describe('<Blog />', () => {
  let likeBlog
  let removeBlog

  beforeEach(() => {
    const blog = {
      title: 'Testing with Vitest',
      author: 'Teppo Testaaja',
      url: 'https://testi.com',
      likes: 5,
      user: {
        id: '123',
        username: 'teppo',
        name: 'Teppo Testaaja'
      }
    }

    likeBlog = vi.fn()
    removeBlog = vi.fn()
    const user = { id: '123', username: 'teppo', name: 'Teppo Testaaja' }

    render(
      <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />
    )
  })

  test('only title and author rendered by default', () => {
    const title = screen.getByText(
      'Testing with Vitest', { exact: false }
    )
    expect(title).toBeDefined()

    const author = screen.getByText(
      'Teppo Testaaja', { exact: false }
    )
    expect(author).toBeDefined()

    const url = screen.queryByText('https://testi.com')
    expect(url).toBeNull()

    const likes = screen.queryByText(5)
    expect(likes).toBeNull()
  })

  test('clicking the view-button renders full information', async () => {
    const eventUser = userEvent.setup()
    const button = screen.getByText('view')
    await eventUser.click(button)

    const title = screen.getByText(
      'Testing with Vitest', { exact: false }
    )
    expect(title).toBeDefined()

    const author = screen.getByText(
      'Teppo Testaaja', { exact: false }
    )
    expect(author).toBeDefined()

    const url = screen.getByText(
      'https://testi.com', { exact: false }
    )
    expect(url).toBeDefined()

    const likes = screen.getByText(
      5, { exact: false }
    )
    expect(likes).toBeDefined()
  })


  test('clicking the like-button twice calls event handler twice', async () => {
    const eventUser = userEvent.setup()
    const buttonView = screen.getByText('view')
    await eventUser.click(buttonView)

    const buttonLike = screen.getByText('like')
    await eventUser.click(buttonLike)
    await eventUser.click(buttonLike)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})