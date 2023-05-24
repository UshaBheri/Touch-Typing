import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
    <div className="logo-container">
      <Link to="/" className="link-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
    </div>
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="not found"
      />
      <h1 className="fail">Page Not Found</h1>
      <p className="failed">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
