import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  console.log(blog)

  const toggleDetails = () => {
    setShowDetails(details => !details)
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
          <p>Likes: {blog.likes}</p>
          <p>Author: {blog.author}</p>
        </div>
      )}
    </div>
  )
}

export default Blog