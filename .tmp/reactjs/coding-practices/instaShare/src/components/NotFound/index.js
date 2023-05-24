import './index.css'

const NotFound = props => {
  const {history} = props
  const onClickRetry = () => {
    history.push('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dahw90b2z/image/upload/v1649202458/erroring_1_wmrpgf.png"
        alt="not found"
        className="image"
      />
      <h1 className="heading">Page not Found</h1>
      <p className="description">
        We are sorry, the page you requested could not found.
      </p>
      <button className="button" type="button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )
}

export default NotFound
