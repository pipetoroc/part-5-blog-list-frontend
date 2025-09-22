import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification  from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import '../index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const createBlog = event => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }
    blogService.create(blogObject).then(returnedBlog => {
      setErrorMessage(`a new blog ${title}, by ${author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
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
      <form onSubmit={createBlog}>
        <div>
          <label >
            title
            <input 
              type="text" 
              value={title} 
              onChange={({target}) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label >
            author
            <input 
              type="text"
              value={author}
              onChange={({target}) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label >
            url:
            <input 
              type="text"
              value={url}
              onChange={({target}) => setUrl(target.value)}
            />
          </label>
        </div>
      <button type='submit'>create</button>
      </form>
      {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </div>
  )
}

export default App