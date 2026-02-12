import Notification from '../components/Notification'
import CreateBlogForm from '../components/CreateBlogForm'
import { ListOfBlogs } from '../components/ListOfBlogs'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { appendBlog } from '../reducers/blogReducer'
import showNotification from '../reducers/notificationReducer'
import Container from 'react-bootstrap/Container'

const Blogs = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const createBlog = (blogObject) => {
    blogService.create(blogObject).then(returnedBlog => {
      dispatch(
        appendBlog({ ...returnedBlog, user })
      )
      showNotification(`a new blog ${blogObject.title}, by ${blogObject.author} added`, 'success')
    })
  }

  return (
    <Container className='mt-5'>
      <Notification />
      <CreateBlogForm createBlog={createBlog} />
      < ListOfBlogs />
    </Container>
  )
}

export default Blogs