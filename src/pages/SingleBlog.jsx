import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import  blogServices from '../services/blogs'
import  { updateBlog, removeBlog } from '../reducers/blogReducer'


const SingleBlog = () => {
  const dispatch = useDispatch()

  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find((blog) => blog.id === id))

  if (!blog) return null

  const handleUpdate = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogServices.update(blog.id, updatedBlog)
      .then(returnedBlog => {

        const blogWithUser = {
          ...returnedBlog,
          user: blog.user
        }
        dispatch(updateBlog(blogWithUser))
      })
      .catch(error => {
        console.error('Error updating blog', error)
      })
  }
  const handleDelete = () => {
    if(window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)){
      blogServices.remove(blog.id).then(() => {
        dispatch(removeBlog(blog.id))
      })
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href="{blog.url}">{blog.url}</a>
      <p>{blog.likes} likes <button onClick={handleUpdate}>like</button></p>
      <button onClick={handleDelete}>remove</button>
      <p>added by {blog.author}</p>
    </div>
  )
}

export default SingleBlog