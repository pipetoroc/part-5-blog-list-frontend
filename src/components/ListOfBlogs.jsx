import { useSelector, useDispatch } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'

import Blog from './Blog'

export const ListOfBlogs =  ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(removeBlog(id))
  }

  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            onDelete={handleDelete}
          />
        ))}
    </>
  )
}
