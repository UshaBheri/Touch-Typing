// Write your code here
import {Component} from 'react'
import './index.css'

class Welcome extends Component {
  state = {
    isSubscribed: false,
  }

  renderSubsButton = () => {
    this.setState(prevState => ({isSubscribed: !prevState.isSubscribed}))
  }

  render() {
    const {isSubscribed} = this.state
    const modeClassName = isSubscribed ? 'subscribe' : 'subscribed'
    const buttonText = isSubscribed ? 'Subscribed' : 'Subscribe'

    return (
      <div className="container">
        <div className={`container ${modeClassName}`}>
          <h1 className="heading">Welcome</h1>
          <h1 className="heading">Thank you! Happy Learning</h1>
          <button
            type="button"
            className="button"
            onClick={this.renderSubsButton}
          >
            {buttonText}
          </button>
        </div>
      </div>
    )
  }
}
export default Welcome
