import { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisbile] = useState(true)

    const toggleVisibility = () => setVisbile(!visible)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    return (
        <div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={hideWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable
