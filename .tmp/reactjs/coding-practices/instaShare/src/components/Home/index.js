import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import InstaPost from '../InstaPost'
import StoryPost from '../StoryPost'
import SearchAccount from '../SearchAccount'
import InstaContext from '../../context/InstaContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getInstaDetails()
  }

  getInstaDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.posts.map(eachPost => ({
        postId: eachPost.post_id,
        userId: eachPost.user_id,
        username: eachPost.user_name,
        profilePic: eachPost.profile_pic,
        imageUrl: eachPost.image_url,
        caption: eachPost.caption,
        likesCount: eachPost.likes_count,
        comment: eachPost.comment,
        createdAt: eachPost.created_at,
      }))
      this.setState({
        searchList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickSearch = () => {
    this.getInstaDetails()
  }

  onChangeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  onEnterSearchInput = () => {
    this.getInstaDetails()
  }

  renderSearchResults = () => {
    const {searchList} = this.state
    const searchResults = searchList.length > 0

    return (
      <InstaContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? 'bg-dark' : 'bg-light'
          return searchResults ? (
            <>
              <div className={`search-container ${bgColor}`}>
                <div className="search-content">
                  <h1 className="search-results">Search Results</h1>
                </div>
              </div>
              <ul className={`list-container ${bgColor}`}>
                {searchList.map(eachPost => (
                  <SearchAccount key={eachPost.postId} userDetails={eachPost} />
                ))}
              </ul>
            </>
          ) : (
            <div className="no-post-view">
              <img
                src="https://res.cloudinary.com/dahw90b2z/image/upload/v1649202381/Group_1_jhn8xw.png"
                className="no-post-img"
                alt="search not found"
              />
              <h1 className="not-found">Search Not Found</h1>
              <p className="description">Search again</p>
            </div>
          )
        }}
      </InstaContext.Consumer>
    )
  }

  onClickRetry = () => {
    this.getInstaDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dahw90b2z/image/upload/v1649208425/Icon_1_qfbohw.png"
        className="fail-img"
        alt="failure view"
      />
      <p className="para">Something Went Wrong. Please try again</p>
      <button type="button" className="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchResults()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <InstaContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? 'bg-dark' : 'bg-light'
          return (
            <div className={`${bgColor}`}>
              <Header
                searchInput={searchInput}
                onClickSearch={this.onClickSearch}
                onChangeSearchInput={this.onChangeSearchInput}
                onEnterSearchInput={this.onEnterSearchInput}
              />
              {searchInput !== '' ? (
                <>{this.renderFinalView()}</>
              ) : (
                <>
                  <StoryPost />
                  <InstaPost />
                </>
              )}
            </div>
          )
        }}
      </InstaContext.Consumer>
    )
  }
}

export default Home
