import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <tbody>
      <tr>
        <td>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </td>
        <td>
          {blog.author}
        </td>
      </tr>
    </tbody>
  )
}
export default Blog