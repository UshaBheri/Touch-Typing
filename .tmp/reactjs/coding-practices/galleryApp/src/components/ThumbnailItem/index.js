// Write your code here.
import './index.css'

const ThumbnailItem = props => {
  const {imageDetails, clickImageItem, isActive} = props
  const {thumbnailUrl, id, thumbnailAltText} = imageDetails

  const thumbnailClassName = isActive ? `thumbnail active` : `thumbnail`

  const onClickImageItem = () => {
    clickImageItem(id)
  }

  return (
    <li className="tab-item-container">
      <button type="button" className="button" onClick={onClickImageItem}>
        <img
          src={thumbnailUrl}
          alt={thumbnailAltText}
          className={thumbnailClassName}
        />
      </button>
    </li>
  )
}

export default ThumbnailItem
