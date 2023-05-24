import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="navbar">
    <div className="nav-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <ul className="nav-menu">
        <Link to="/" className="nav-item">
          <li>Home</li>
        </Link>
      </ul>
    </div>
  </nav>
)

export default Header
