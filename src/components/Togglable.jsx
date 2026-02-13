import { forwardRef, useImperativeHandle, useState } from 'react'
import Button from 'react-bootstrap/Button'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div className='my-3'>

      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>

      <div style={showWhenVisible}>
        {children}
      </div>

      <Button style={showWhenVisible} onClick={toggleVisibility} variant='outline-secondary' className='text-capitalize mb-5'>cancel</Button>
    </div>
  )
})

export default Togglable