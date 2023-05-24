import './index.css'

const BrowserHistory = props => {
  const {historyDetails, onDeleteApp} = props
  const {id, timeAccessed, logoUrl, title, domainUrl} = historyDetails

  const onDelete = () => {
    onDeleteApp(id)
  }

  return (
    <li className="list-container">
      <p className="time">{timeAccessed}</p>
      <img src={logoUrl} className="logo-url" alt="domain logo" />
      <p className="title">{title}</p>
      <p className="domain-url">{domainUrl}</p>
      <button
        className="button"
        type="button"
        data-testid="delete"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
          data-testid="delete"
          className="delete"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default BrowserHistory
