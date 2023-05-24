// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStared} = appointmentDetails

  const starImg = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="list-container">
      <div className="container">
        <p className="name">{title}</p>
        <button
          className="button"
          type="button"
          data-testid="star"
          onClick={onClickStar}
        >
          <img src={starImg} className="star" alt="star" />
        </button>
      </div>
      <p className="time">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
