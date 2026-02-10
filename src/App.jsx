import { useState, useEffect } from 'react'
import Notification  from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import '../index.css'
import CreateBlogForm from './components/CreateBlogForm'
import { ListOfBlogs } from './components/ListOfBlogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { appendBlog, setBlogs } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const showNotification = (message, type = 'success') => {
    dispatch(setNotification({ message, type })
    )

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(setBlogs( blogs ))
    })
  }, [dispatch])

  const createBlog = (blogObject) => {
    blogService.create(blogObject).then(returnedBlog => {
      dispatch(
        appendBlog({ ...returnedBlog, user })
      )
      showNotification(`a new blog ${blogObject.title}, by ${blogObject.author} added`, 'success')
    })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))

      setUsername('')
      setPassword('')
    } catch{
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch(clearUser())
  }

  if (user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            <label>
               username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)} />
            </label>
          </div>
          <div>
            <label>
               password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)} />
            </label>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
      <h2>Create new</h2>
      <CreateBlogForm
        createBlog={createBlog}
      />
      < ListOfBlogs />
    </div>
  )
}

export default App