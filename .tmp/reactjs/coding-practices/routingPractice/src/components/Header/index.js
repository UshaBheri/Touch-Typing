// Write your JS code here
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/wave-logo-img.png "
        alt="wave"
        className="logo"
      />
      <h1 className="title">Wave</h1>
    </div>
    <ul className="nav-menu">
      <li className="link-item">
        <Link className="nav-item" to="/">
          Home
        </Link>
      </li>
      <li className="link-item">
        <Link className="nav-item" to="/about">
          About
        </Link>
      </li>
      <li className="link-item">
        <Link className="nav-item" to="/contact">
          Contact
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header
