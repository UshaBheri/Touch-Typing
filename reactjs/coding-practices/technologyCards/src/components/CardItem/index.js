// Write your code here.
import './index.css'

const CartItem = props => {
  const {cardItem} = props
  const {title, description, imgUrl, className} = cardItem

  return (
    <li className={className}>
      <h1 className="heading">{title}</h1>
      <p className="description">{description}</p>
      <img src={imgUrl} alt={title} className="card-img" />
    </li>
  )
}
export default CartItem
