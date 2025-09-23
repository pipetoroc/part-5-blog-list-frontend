import { forwardRef, useImperativeHandle, useState } from "react"

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
    <div>

      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
      </div>

      <button onClick={toggleVisibility}>cancel</button>
    </div>
  )
})

export default Togglable