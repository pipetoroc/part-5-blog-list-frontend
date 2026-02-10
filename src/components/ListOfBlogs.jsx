import { useSelector } from 'react-redux'

import Blog from './Blog'

export const ListOfBlogs =  () => {
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
        />
      ))}
    </>
  )
}
