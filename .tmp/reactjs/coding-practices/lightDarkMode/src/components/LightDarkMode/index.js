// Write your code here
import {Component} from 'react'
import './index.css'

class LightDarkMode extends Component {
  state = {
    isModeLightDark: true,
  }

  onClickButton = () => {
    this.setState(prevState => ({isModeLightDark: !prevState.isModeLightDark}))
  }

  render() {
    const {isModeLightDark} = this.state
    const modeClassName = isModeLightDark ? 'dark-mode' : 'light-mode'
    const buttonText = isModeLightDark ? 'Light Mode' : 'Dark Mode'

    return (
      <div className="container">
        <div className={`card-container ${modeClassName}`}>
          <h1 className="heading">Click To Change Mode</h1>
          <button type="button" className="button" onClick={this.onClickButton}>
            {buttonText}
          </button>
        </div>
      </div>
    )
  }
}
export default LightDarkMode
