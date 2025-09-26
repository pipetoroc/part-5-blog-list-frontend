import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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