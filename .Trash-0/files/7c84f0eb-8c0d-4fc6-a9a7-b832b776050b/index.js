import React from 'react'
import './index.css'

const HistoryItem = props => {
  const {historyDetails, onDeleteApp} = props
  const {id, timeAccessed, logoUrl, title, domainUrl} = historyDetails

  const onDelete = () => {
    onDeleteApp(id)
  }

  return (
    <li className="list-container">
      <hl className="time">{timeAccessed}</hl>
      <img src={logoUrl} className="logo-url" alt="domain logo" />
      <h1 className="title">{title}</h1>
      <h1 className="domain-url">{domainUrl}</h1>
      <button
        className="button"
        type="button"
        testid="delete"
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

export default HistoryItem
