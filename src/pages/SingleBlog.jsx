import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import  blogServices from '../services/blogs'
import  { updateBlog } from '../reducers/blogReducer'
import Comments from '../components/Comments'
import Button from 'react-bootstrap/Button'

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

  return (
    <div>
      <h2 className='text-uppercase'>blogs</h2>
      <h2 >{blog.title}</h2>
      <a className='pb-2'href="{blog.url}">{blog.url}</a>
      <p className='pb-2'>{blog.likes} likes <Button size='sm' variant="secondary" onClick={handleUpdate} className='ms-3'>like</Button></p>
      <p className='pb-2'>added by {blog.author}</p>
      <Comments blog={blog} />
    </div>
  )
}

export default SingleBlog