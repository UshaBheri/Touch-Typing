// Write your code here
import {Component} from 'react'
import './index.css'

class FruitsCounter extends Component {
  state = {count: 0}

  onEatMango = () => {
    this.setState(prevState => {
      console.log(`Previous State value ${prevState.count}`)
      return {count: prevState.count + 1}
    })
  }

  onEatBanana = () => {
    this.setState(prevState => {
      console.log(`Previous State value ${prevState.count}`)
      return {count: prevState.count + 1}
    })
  }

  render() {
    const {count} = this.state
    return (
      <div className="container">
        <h1 className="headingCount">
          Bob ate {count} mangoes {count} bananas
        </h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/mango-img.png "
          className="mango"
          alt="mango"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/banana-img.png"
          className="banana"
          alt="banana"
        />
        <div>
          <button className="button" onClick={this.onEatMango}>
            Eat Mango
          </button>
          <button className="button" onClick={this.onEatBanana}>
            Eat Banana
          </button>
        </div>
      </div>
    )
  }
}
export default FruitsCounter
