// Write your code here
import {Component} from 'react'

class RandomNumberGenerator extends Component {
  state = {
    count: 0,
  }

  generateButton = () => Math.ceil(Math.random() * 100)

  onClickGenerate = () => {
    const randomNumber = this.generateButton()

    this.setState(prevState => ({count: prevState.count + randomNumber}))
  }

  render() {
    const {count} = this.state

    return (
      <div className="container">
        <div className="card-container">
          <h1 className="heading">Random Number</h1>
          <p className="description">
            Generate a random number in the range of 0 to 100
          </p>
          <div>
            <button
              type="button"
              className="button"
              onClick={this.onClickGenerate}
            >
              Generate
            </button>
            <p>{count}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default RandomNumberGenerator
