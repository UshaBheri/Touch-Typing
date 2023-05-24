// Write your code here
import {GrFormClose} from 'react-icons/gr'
import './index.css'

const Notification = props => {
  const {children} = props
  return (
    <div className="notification-container">
      <div className="card-container">{children}</div>
      <GrFormClose className="notification" />
    </div>
  )
}

export default Notification
