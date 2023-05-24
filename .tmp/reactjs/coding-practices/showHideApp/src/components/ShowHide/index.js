// Write your code here
import {Component} from 'react'
import './index.css'

class ShowHide extends Component {
  state = {
    isFirstname: false,
    isLastname: false,
  }

  onClickFirstName = () => {
    this.setState(prevState => ({isFirstname: !prevState.isFirstname}))
  }

  onClickLastName = () => {
    this.setState(prevState => ({isLastname: !prevState.isLastname}))
  }

  render() {
    const {isFirstname, isLastname} = this.state
    return (
      <div className="card-container">
        <div>
          <h1 className="heading">Show/Hide</h1>
          <div className="show-hide-container">
            <div className="name-container">
              <button
                type="button"
                className="button"
                onClick={this.onClickFirstName}
              >
                Show/Hide Firstname
              </button>
              {isFirstname && <p className="name">Joe</p>}
            </div>
            <div className="name-container">
              <button
                type="button"
                className="button"
                onClick={this.onClickLastName}
              >
                Show/Hide Lastname
              </button>
              {isLastname && <p className="name">Jonas</p>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowHide
