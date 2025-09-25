import { useRef, useState } from 'react'
import Togglable from './Togglable'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url
    }
    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
    togglableRef.current.toggleVisibility()
  }
  return (
    <div>
      <Togglable buttonLabel="Create a new blog" ref={togglableRef}>
        <form onSubmit={handleSubmit}>
          <div>
            <label >
              title
              <input
                type="text"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label >
              author
              <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label >
              url:
              <input
                type="text"
                value={url}
                onChange={event => setUrl(event.target.value)}
              />
            </label>
          </div>
          <button type='submit'>create</button>
        </form>
      </Togglable>
    </div>
  )
}
export default CreateBlogForm