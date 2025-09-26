import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('form calls event handler with right details when a new blog is created', async() => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreateBlogForm createBlog={createBlog}/>)

  const inputTitle = screen.getByLabelText(/title/i)
  const inputAuthor = screen.getByLabelText(/author/i)
  const inputUrl = screen.getByLabelText(/url/i)

  const submitButton = screen.getByText('create')

  await user.type(inputTitle, 'Testing with vitest')
  await user.type(inputAuthor, 'Laura Candido')
  await user.type(inputUrl, 'http://example.com')
  await user.click(submitButton)

  expect(createBlog).toHaveBeenCalledTimes(1)

  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: 'Testing with vitest',
    author: 'Laura Candido',
    url: 'http://example.com'
  })
})
