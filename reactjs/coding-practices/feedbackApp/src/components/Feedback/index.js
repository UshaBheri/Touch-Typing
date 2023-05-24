// Write your React code here.
import {Component} from 'react'
import './index.css'

class Feedback extends Component {
  state = {
    isFeedback: true,
  }

  onChangeResponse = () => {
    this.setState({isFeedback: false})
  }

  responsePage = () => {
    const {resources} = this.props
    const {emojis} = resources

    return (
      <div className="emoji-container">
        <div className="card-container">
          <h1 className="main-heading">
            How satisfied are you with our
            <br />
            Customer support performance?
          </h1>
          <ul className="emoji-list">
            {emojis.map(eachEmoji => (
              <li key={eachEmoji.id} className="list-container">
                <button
                  type="button"
                  className="button"
                  onClick={this.onChangeResponse}
                >
                  <img
                    src={eachEmoji.imageUrl}
                    alt={eachEmoji.name}
                    className="img"
                  />
                  <p>{eachEmoji.name}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  feedbackPage = () => {
    const {resources} = this.props
    const {loveEmojiUrl} = resources

    return (
      <div className="thankyou-container">
        <img src={loveEmojiUrl} alt="love emoji" />
        <h1 className="heading">Thank You!</h1>
        <p className="feedback">
          We will your feedback to improve our customer support perfomance
        </p>
      </div>
    )
  }

  render() {
    const {isFeedback} = this.state

    return (
      <div className="bg-container">
        <div className="container">
          {isFeedback ? this.responsePage() : this.feedbackPage()}
        </div>
      </div>
    )
  }
}

export default Feedback
