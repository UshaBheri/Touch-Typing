// Write your code here
import {Component} from 'react'
import './index.css'

class EvenOddApp extends Component {
  state = {
    count: 0,
  }

  getRandomNumber = () => Math.ceil(Math.random() * 100)

  onIncrement = () => {
    const randomNumber = this.getRandomNumber()

    this.setState(prevState => ({count: prevState.count + randomNumber}))
  }

  render() {
    const {count} = this.state
    const eventOddText = count % 2 === 0 ? 'Even' : 'Odd'

    return (
      <div className="card-container">
        <div className="count-container">
          <h1 className="heading">Count {count}</h1>
          <p className="even-text">Count is {eventOddText}</p>
          <button type="button" onClick={this.onIncrement} className="button">
            Increment
          </button>
          <p className="description">
            *Increase By Random Number Between 0 to 100
          </p>
        </div>
      </div>
    )
  }
}

export default EvenOddApp
