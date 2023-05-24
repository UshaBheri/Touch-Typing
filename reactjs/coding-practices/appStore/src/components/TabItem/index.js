// Write your code here
import './index.css'

const TabItem = props => {
  const {tabDetails, onClickActiveTabId, isActive} = props
  const {tabId, displayText} = tabDetails

  const onClickTab = () => {
    onClickActiveTabId(tabId)
  }

  const tabClassName = isActive ? `tab-button active` : 'tab-button'

  return (
    <li className="list">
      <button type="button" className={tabClassName} onClick={onClickTab}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
