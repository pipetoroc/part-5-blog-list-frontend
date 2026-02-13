import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import blogServices from '../services/blogs'
import { Form, FormControl, Button, FormGroup } from 'react-bootstrap'

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
    <section className='container mt-5'>
      <h2 className='text-capitalize'>comments</h2>

      <Form onSubmit={handleAddComment}>
        <FormGroup className='mb-3'>
          <FormControl name="comment" placeholder='Write a comment ...'/>
          <Button type="submit" className='mt-3'>add comment</Button>
        </FormGroup>
      </Form>

      <ul>
        {
          blog.comments.map((comment,i) => <li key={i}>
            {comment}
          </li>
          )
        }
      </ul>
    </section>
  )
}

export default Comments