import React, { useImperativeHandle, useState } from "react"

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggle = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggle }
  })

  return (
    <div>

      <button 
        onClick={toggle}
        style={{display: visible ? 'none' : ''}}>
        {props.text}
      </button>

      <div style={{display: visible ? '' : 'none'}}>
        { props.children }
        <button onClick={toggle}>Cancel</button>
      </div>

    </div>
  )
})

export default Togglable