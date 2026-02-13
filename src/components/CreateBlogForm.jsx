import { useRef, useState } from 'react'
import Togglable from './Togglable'
import { Form, Button } from 'react-bootstrap'

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
    <div >
      <Togglable buttonLabel="Create a new blog" ref={togglableRef}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' >
            <Form.Label >
              Title
              <Form.Control
                type="text"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='text-capitalize'>
              author
              <Form.Control
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label className='text-capitalize'>
              url:
              <Form.Control
                type="text"
                value={url}
                onChange={event => setUrl(event.target.value)}
              />
            </Form.Label>
          </Form.Group>
          <Button type='submit' className='text-capitalize my-3' >create</Button>
        </Form>
      </Togglable>
    </div>
  )
}
export default CreateBlogForm