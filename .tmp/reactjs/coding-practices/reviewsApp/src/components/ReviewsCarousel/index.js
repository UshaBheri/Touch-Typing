// Write your code here
import {Component} from 'react'
import './index.css'

class ReviewsCarousel extends Component {
  state = {
    activeReviewId: 0,
  }

  getReview = reviewsList => {
    const {activeReviewId} = this.state
    const {imgUrl, username, companyName, description} = reviewsList[
      activeReviewId
    ]

    return (
      <div className="container">
        <h1 className="heading">Reviews</h1>
        <img src={imgUrl} className="img" alt={username} />
        <p className="username">{username}</p>
        <p>{companyName}</p>
        <p>{description}</p>
      </div>
    )
  }

  onClickLeft = () => {
    const {activeReviewId} = this.state

    if (activeReviewId > 0) {
      this.setState(prevState => ({
        activeReviewId: prevState.activeReviewId + 1,
      }))
    }
  }

  onClickRight = () => {
    const {reviewsList} = this.props
    const {activeReviewId} = this.state

    if (activeReviewId < reviewsList.length - 1) {
      this.setState(prevState => ({
        activeReviewId: prevState.activeReviewId + 1,
      }))
    }
  }

  render() {
    const {reviewsList} = this.props

    return (
      <div className="reviewContainer">
        <button
          type="button"
          className="button"
          onClick={this.onClickLeft}
          data-testid="leftArrow"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/left-arrow-img.png"
            className="left"
            alt="left arrow"
          />
        </button>
        {this.getReview(reviewsList)}
        <button
          type="button"
          className="button"
          onClick={this.onClickRight}
          data-testid="rightArrow"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/right-arrow-img.png"
            className="right"
            alt="right arrow"
          />
        </button>
      </div>
    )
  }
}

export default ReviewsCarousel
