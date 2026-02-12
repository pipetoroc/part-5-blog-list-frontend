import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import blogServices from '../services/blogs'

const Comments = ({ blog }) => {
  console.log(blog)
  const dispatch = useDispatch()

  const handleAddComment = async event => {
    event.preventDefault()

    const comment = event.target.comment.value
    const updatedBlog = await blogServices.addComment(blog.id, comment)

    dispatch(addComment(updatedBlog))

    event.target.comment.value = ''
  }

  return (
    <>
      <h2>comments</h2>

      <form onSubmit={handleAddComment}>
        <input name="comment" placeholder='Write a comment ...'/>
        <button type="submit">add comment</button>
      </form>

      <ul>
        {
          blog.comments.map((comment,i) => <li key={i}>
            {comment}
          </li>
          )
        }
      </ul>
    </>
  )
}

export default Comments