import CreateBlogForm from '../components/CreateBlogForm'
import { ListOfBlogs } from '../components/ListOfBlogs'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { appendBlog } from '../reducers/blogReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Blogs = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const createBlog = (blogObject) => {
    blogService.create(blogObject).then(returnedBlog => {
      dispatch(
        appendBlog({ ...returnedBlog, user })
      )

      dispatch(setNotification({
        message: `a new blog ${blogObject.title}, by ${blogObject.author} added`,
        type: 'success'
      }))

      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    })
  }

  return (
    <>
      <CreateBlogForm createBlog={createBlog} />
      < ListOfBlogs />
    </>
  )
}

export default Blogs