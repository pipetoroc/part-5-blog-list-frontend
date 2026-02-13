import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import Notification  from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { getAllUsers } from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './pages/Users'
import Blogs from './pages/Blogs'
import User from './pages/User'
import SingleBlog from './pages/SingleBlog'
import { NavbarBrand, Container, Navbar, Button, Nav } from 'react-bootstrap'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers().then(users => {
      setUsers(users)
    })
  }, [])

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
    <div className='container'>
      <Router>
        <Navbar expand="md">
          <Container>
            <Notification />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className='me-auto'>
                <Nav.Link
                  as={Link}
                  to="/"
                  className='text-capitalize'
                >
                 blogs
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/users"
                  className='text-capitalize'
                >
                  users
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <NavbarBrand>{user.name} logged in <Button onClick={handleLogout} variant="secondary">Log out</Button></NavbarBrand>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Blogs />}/>
          <Route path="/users" element={<Users users={users}/>}/>
          <Route path="/users/:id" element={<User users={users}/>}/>
          <Route path="/blogs/:id" element={<SingleBlog />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App