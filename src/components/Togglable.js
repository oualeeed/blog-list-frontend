import { useState } from 'react'
import './Togglable.css'

const Togglable = (props) => {
  const [visible, setVisbile] = useState(true)

  const toggleVisibility = () => setVisbile(!visible)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div className="create-blog" style={showWhenVisible}>
        <button className="create-blog-button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div className='add-blog-section' style={hideWhenVisible}>
        <div className='add-blog-form'>
          {props.children}
          <div className='cancel-button-container'>
            <button className='cancel-button' onClick={toggleVisibility}>cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Togglable
