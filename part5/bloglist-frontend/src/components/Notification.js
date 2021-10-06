import '../styles/notification.css'

const Notification = ({message}) => {

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