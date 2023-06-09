import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {count: 0}

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrement = () => {
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  render() {
    const {count} = this.state
    console.log(`count in state: ${count}`)
    return (
      <div className="app-container">
        <h1 className="heading">Counter</h1>
        <p className="count">{count}</p>
        <div>
          <button type="button" className="button" onClick={this.onIncrement}>
            Increase
          </button>
          <button type="button" className="button" onClick={this.onDecrement}>
            Decrease
          </button>
        </div>
      </div>
    )
  }
}

export default Counter
