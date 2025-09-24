import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification  from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import '../index.css'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = (blogObject) => {
    blogService.create(blogObject).then(returnedBlog => {
      setErrorMessage(`a new blog ${blogObject.title}, by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch{
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

    if (user === null){
     return (
      <div>
        <h2>Log in to application</h2>
         {errorMessage && <Notification message={errorMessage} type="error"/>}
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
      {errorMessage && <Notification message={errorMessage} type="success"/>}
      <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
      <h2>Create new</h2>
        <CreateBlogForm
          createBlog={createBlog}
        />
      {blogs.sort((a, b) => a.likes - b.likes).map(blog => (
        <Blog 
          key={blog.id} 
          blog={blog}
          user={user}
          onDelete={(id) => setBlogs(blogs.filter(b => b.id !== id))}
        />)
        )}
    </div>
  )
}

export default App