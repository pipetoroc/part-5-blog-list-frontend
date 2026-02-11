import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`}>
      <div className="blog">
        {blog.title} {blog.author}
      </div>
    </Link>
  )
}

export default Blog