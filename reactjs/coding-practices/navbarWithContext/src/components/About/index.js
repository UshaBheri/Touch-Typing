// Write your code here
import Navbar from '../Navbar'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const About = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      return (
        <>
          {!isDarkTheme ? (
            <div className="about-container">
              <Navbar />
              <div className="about-light">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/about-light-img.png"
                  alt="theme"
                  className="about-img"
                />
                <h1 className="about-heading">About</h1>
              </div>
            </div>
          ) : (
            <div className="about-container">
              <Navbar />
              <div className="about-dark">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/about-dark-img.png"
                  alt="about"
                  className="about-img"
                />
                <h1 className="about-heading">About</h1>
              </div>
            </div>
          )}
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default About
