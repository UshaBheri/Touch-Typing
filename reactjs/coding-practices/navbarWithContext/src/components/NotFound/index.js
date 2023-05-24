// Write your code here
import Navbar from '../Navbar'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      return (
        <>
          {!isDarkTheme ? (
            <div className="not-found--container">
              <Navbar />
              <div className="not-found-light">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
                  alt="not found"
                  className="not-found-img"
                />
                <h1 className="not-found-heading">Lost your way</h1>
                <p className="bad-path">We cannot seem to find the page</p>
              </div>
            </div>
          ) : (
            <div className="not-found--container">
              <Navbar />
              <div className="not-found-light">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
                  alt="not found"
                  className="not-found-img"
                />
                <h1 className="not-found-heading">Lost your way</h1>
                <p className="bad-path">We cannot seem to find the page</p>
              </div>
            </div>
          )}
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
