import './index.css'

const BannerCardItem = props => {
  const {bannerCard} = props
  const {heading, description, className} = bannerCard
  return (
    <li className={`card ${className}`}>
      <div>
        <div>
          <h1 className="main-heading">The Seasons Latest</h1>
        </div>
        <h1 className="heading">{heading}</h1>
        <p className="para">{description}</p>
        <button type="button" className="button">
          Show More
        </button>
      </div>
      <div>
        <h1 className="main-heading">Our New Designs</h1>
      </div>
      <div>
        <h1 className="main-heading">Insiders</h1>
      </div>
    </li>
  )
}

export default BannerCardItem
