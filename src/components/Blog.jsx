import { useState } from 'react'
import blogService from '../services/blogs'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const dispatch = useDispatch()

  const toggleDetails = () => {
    setShowDetails(details => !details)
  }

  const handleUpdate = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    blogService.update(blog.id, updatedBlog)
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
      blogService.remove(blog.id).then(() => {
        dispatch(removeBlog(blog.id))
      })
    }
  }

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>
        {showDetails ? 'Hide' : 'View'}
      </button>

      {showDetails && (
        <div >
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}
            <button onClick={handleUpdate}> Like </button>
          </p>
          <p>Author: {blog.author}</p>

          {blog.user?.username === user.username && (
            <button className="remove" onClick={handleDelete}>Remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog