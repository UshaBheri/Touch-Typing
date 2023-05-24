// Write your code here
import {Component} from 'react'

import SuggestionItem from '../SuggestionItem'

import './index.css'

class GoogleSuggestions extends Component {
  state = {
    searchInput: '',
  }

  updateSearchInput = value => {
    this.setState({
      searchInput: value,
    })
  }

  onChangeInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {searchInput} = this.state
    const {suggestionsList} = this.props
    const searchResults = suggestionsList.filter(eachInput =>
      eachInput.suggestion.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/google-logo.png"
          alt="google logo"
          className="google-img"
        />
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
            alt="search icon"
            className="search-icon"
          />
        </div>
        <input
          type="search"
          className="input"
          placeholder="Search Google"
          onChange={this.onChangeInput}
          value={searchInput}
        />
        <ul className="list-container">
          {searchResults.map(eachInput => (
            <SuggestionItem
              userDetails={eachInput}
              key={eachInput.id}
              updateSearchInput={this.updateSearchInput}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default GoogleSuggestions
