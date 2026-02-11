import Notification from '../components/Notification'
import CreateBlogForm from '../components/CreateBlogForm'
import { ListOfBlogs } from '../components/ListOfBlogs'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { appendBlog } from '../reducers/blogReducer'
import showNotification from '../reducers/notificationReducer'

const Home = () => {

  const user = useSelector(state => state.user)
  console.log('USER IN HOME', user)
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

    <div>
      <Notification />
      <CreateBlogForm
        createBlog={createBlog}
      />
      < ListOfBlogs />
    </div>
  )
}

export default Home