import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This is a test in the frontend using @testing-library/react',
    author: 'Fullstack open'
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText(/This is a test in the frontend using @testing-library\/react/i)
  expect(titleElement).toBeDefined()

  const authorElement = screen.getByText(/Fullstack open/i)
  expect(authorElement).toBeDefined()
})