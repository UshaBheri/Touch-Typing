// Write your JS code here
import Header from '../Header'
import LogoutButton from '../LogoutButton'
import './index.css'

const About = () => (
  <div>
    <Header />
    <div className="about-container">
      <h1 className="heading">About Route</h1>
      <LogoutButton />
    </div>
  </div>
)

export default About
