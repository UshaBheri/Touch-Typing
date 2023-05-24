// Write your code here
import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    timeRunning: false,
    timeStops: 0,
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  onClickResetButton = () => {
    clearInterval(this.timeInterval)
    this.setState({timeRunning: false, timeStops: 0})
  }

  onClickStopButton = () => {
    clearInterval(this.timeInterval)
    this.setState({timeRunning: false})
  }

  updatedTime = () => {
    this.setState(prevState => ({
      timeStops: prevState.timeStops + 1,
    }))
  }

  onClickStartButton = () => {
    this.timeInterval = setInterval(this.updatedTime, 1000)
    this.setState({timeRunning: true})
  }

  renderSeconds = () => {
    const {timeStops} = this.state
    const seconds = Math.floor(timeStops % 60)

    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinutes = () => {
    const {timeStops} = this.state
    const minutes = Math.floor(timeStops / 60)

    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    const {timeRunning} = this.state
    const time = `${this.renderMinutes()}:${this.renderSeconds()}`

    return (
      <div className="container">
        <div className="card-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                className="timer-img"
                alt="stopwatch"
              />
              <p className="text">Timer</p>
              <div>
                <h1 className="time">{time}</h1>
                <div className="timer-buttons">
                  <button
                    className="start"
                    type="button"
                    onClick={this.onClickStartButton}
                    disabled={timeRunning}
                  >
                    Start
                  </button>
                  <button
                    className="stop"
                    type="button"
                    onClick={this.onClickStopButton}
                  >
                    Stop
                  </button>
                  <button
                    className="stop"
                    type="button"
                    onClick={this.onClickResetButton}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
