import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  console.log(blog)

  const toggleDetails = () => {
    setShowDetails(details => !details)
  }

  const handleUpdate = () => {

    const updatedBlog = {
      ...blog,
      likes: likes + 1
    }

    blogService.update(blog.id, updatedBlog)
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
      })
      .catch(error => {
        console.error("Error updating blog", error)
      })
  }

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>
        {showDetails ? "Hide" : "View"}
      </button>

      {showDetails && (
        <div >
          <p>Url: {blog.url}</p>
          <p>Likes: {likes} 
            <button onClick={handleUpdate}> Like </button>
          </p>
          <p>Author: {blog.author}</p>
        </div>
      )}
    </div>
  )
}

export default Blog