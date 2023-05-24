import './index.css'

const Greetings = props => {
  const {greetingDetails, changeLanguage, activeLanguage} = props
  const {id, buttonText} = greetingDetails
  const isActive = activeLanguage ? 'activeEl' : 'notActive'

  const onClickLanguage = () => {
    changeLanguage(id)
  }

  return (
    <li className="list-container">
      <button type="button" className={isActive} onClick={onClickLanguage}>
        {buttonText}
      </button>
    </li>
  )
}

export default Greetings
