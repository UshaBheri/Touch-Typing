import './index.css'

const TravelPlace = props => {
  const {travelDetails} = props
  const {name, imageUrl, description} = travelDetails

  return (
    <li className="item-container">
      <img src={imageUrl} alt={name} className="image" />
      <h1 className="name">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}

export default TravelPlace
