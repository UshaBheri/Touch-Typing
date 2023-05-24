// Write your code here
import Navbar from '../Navbar'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const Home = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      return (
        <>
          {!isDarkTheme ? (
            <div className="home-container">
              <Navbar />
              <div className="home-light">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/home-light-img.png"
                  alt="theme"
                  className="home-img"
                />
                <h1 className="home-heading">Home</h1>
              </div>
            </div>
          ) : (
            <div className="home-container">
              <Navbar />
              <div className="home-dark">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/home-dark-img.png"
                  alt="home"
                  className="home-img"
                />
                <h1 className="home-heading">Home</h1>
              </div>
            </div>
          )}
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default Home
