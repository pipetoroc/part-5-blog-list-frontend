import { useSelector } from 'react-redux'

import Blog from './Blog'

export const ListOfBlogs =  ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  const sortedBlogs = [...blogs].sort(
    (a, b) => b.likes - a.likes
  )

  return (
    <>
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      ))}
    </>
  )
}
