// Write your JS code here
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="nxt-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png "
        className="website-logo"
        alt="website logo"
      />
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="nav-item">
            Products
          </Link>
        </li>
        <li>
          <Link to="/cart" className="nav-item">
            Cart
          </Link>
        </li>
        <button type="button" className="button">
          Logout
        </button>
        <button type="button" className="logout">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
            alt="logout icon"
            className="logout icon"
          />
        </button>
      </ul>
    </div>
  </nav>
)
export default Header
