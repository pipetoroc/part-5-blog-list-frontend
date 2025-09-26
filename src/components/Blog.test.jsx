import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

test('renders content', () => {
  const blog = {
    title: 'This is a test in the frontend using @testing-library/react',
    author: 'Fullstack open'
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText('This is a test in the frontend using @testing-library', { exact: false })
  expect(titleElement).toBeDefined()

  const authorElement = screen.getByText('Fullstack open', { exact: false })
  expect(authorElement).toBeDefined()
})

test('does not render likes', () => {
  const blog = {
    title: 'Blog with no likes',
    author: 'Felipe',
    likes: 10
  }

  render(<Blog blog={blog}/>)

  const element = screen.queryByText('Likes: 10')
  expect(element).toBeNull()
})

test('clicking the "View" button shows blog details', async() => {
  const blog = {
    title: 'Testing button',
    author: 'Laura Candido',
    url: 'http://example.com',
    likes: 5,
    user: { username: 'laura' }
  }

  render(<Blog
    blog={blog}
    user={{ username: 'Laura' }}
    onDelete={() => {}}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  expect(screen.getByText(/Url:/i)).toBeInTheDocument()
  expect(screen.getByText(/Likes:/i)).toBeInTheDocument()
  expect(screen.getByText(/Author:/i)).toBeInTheDocument()
})

test('clicking twice the like button', async() => {
  const blog = {
    title: 'Testing button',
    author: 'Laura Candido',
    url: 'http://example.com',
    likes: 5,
    user: { username: 'laura' }
  }

  blogService.update.mockImplementation((id, updatedBlog) => Promise.resolve(updatedBlog))

  render(<Blog
    blog={blog}
    user={{ username: 'Felipe' }}
    onDelete={() => {}}
  />)

  const user = userEvent.setup()
  const buttonView = screen.getByText('View')
  await user.click(buttonView)

  const buttonLike = screen.getByText('Like')
  await user.click(buttonLike)
  await user.click(buttonLike)

  expect(screen.getByText(/Likes: 7/i)).toBeInTheDocument()
})