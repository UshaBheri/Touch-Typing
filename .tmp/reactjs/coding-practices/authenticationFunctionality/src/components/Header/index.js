// Write your JS code here
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="navbar">
    <div className="nav-content">
      <ul className="nav-menu">
        <li className="nav-link">
          <Link to="/" className="nav-item">
            Home
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/about" className="nav-item">
            About
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header
