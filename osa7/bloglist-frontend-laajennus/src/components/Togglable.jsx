import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility} className="ms-2">
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="primary" onClick={toggleVisibility} className="ms-2">
          cancel
        </Button>
      </div>
    </div>
  )
})

export default Togglable
