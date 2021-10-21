import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/notification.css'

const Notification = () => {
  const message = useSelector(store => store.notification)

  return (
    message !== null
      ?
      <div className={`notification ${message.status}`}>
        {message.text}
      </div>
      : null
  )
}

export default Notification