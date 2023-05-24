// Write your code here.
import {Component} from 'react'

import './index.css'

class LettersCalculator extends Component {
  state = {
    inputText: '',
  }

  onClickSearchInput = event => {
    const newText = event.target.value
    this.setState({
      inputText: newText,
    })
  }

  render() {
    const heading = 'Calculate the Letters you enter'
    const imgUrl =
      'https://assets.ccbp.in/frontend/react-js/stop-watch-with-calculator-img.png'
    const {inputText} = this.state
    const count = inputText.length

    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="heading">{heading}</h1>
          <label htmlFor="userInput" className="user-input">
            Enter the phrase
          </label>
          <input
            type="text"
            className="input-text"
            id="userInput"
            placeholder="Enter the phrase"
            onChange={this.onClickSearchInput}
          />
          <p className="count">No.of letters: {count}</p>
        </div>
        <img src={imgUrl} className="image" alt="letters calculator" />
      </div>
    )
  }
}

export default LettersCalculator
