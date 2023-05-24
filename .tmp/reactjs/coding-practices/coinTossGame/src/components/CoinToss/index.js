// Write your code here
import {Component} from 'react'

import './index.css'

const headImg = 'https://assets.ccbp.in/frontend/react-js/heads-img.png'
const tailImg = 'https://assets.ccbp.in/frontend/react-js/tails-img.png'

class CoinToss extends Component {
  state = {
    tossResultImgs: headImg,
    headsCount: 0,
    tailsCount: 0,
  }

  onTossCount = () => {
    const {headsCount, tailsCount} = this.state
    const toss = Math.floor(Math.random() * 2)

    let tossImgs = ''
    let newHeadCount = headsCount
    let newTailCount = tailsCount

    if (toss === 0) {
      tossImgs = headImg
      newHeadCount += 1
    } else {
      tossImgs = tailImg
      newTailCount += 1
    }
    this.setState({
      tossResultImgs: tossImgs,
      headsCount: newHeadCount,
      tailsCount: newTailCount,
    })
  }

  render() {
    const {tossResultImgs, headsCount, tailsCount} = this.state
    const totalCount = headsCount + tailsCount

    return (
      <div className="app-container">
        <div className="container">
          <h1 className="heading">Coin Toss Game</h1>
          <p className="head-tail">Heads (or) Tails</p>
          <img src={tossResultImgs} className="result-img" alt="toss result" />
          <button type="button" className="button" onClick={this.onTossCount}>
            Toss Coin
          </button>
          <div>
            <p className="count">Total: {totalCount}</p>
            <p className="count">Heads: {headsCount}</p>
            <p className="count">Tails: {tailsCount}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CoinToss
