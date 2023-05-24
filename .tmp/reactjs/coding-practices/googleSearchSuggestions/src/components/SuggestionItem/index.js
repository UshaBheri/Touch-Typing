// Write your code here
import './index.css'

const SuggestionItem = props => {
  const {userDetails, updateSearchInput} = props
  const {suggestion} = userDetails

  const onClickSuggestion = () => {
    updateSearchInput(suggestion)
  }

  return (
    <li className="google-search">
      <p className="search-input">{suggestion}</p>
      <button type="button" className="button" onClick={onClickSuggestion}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png "
          alt="arrow left"
          className="arrow-left"
        />
      </button>
    </li>
  )
}

export default SuggestionItem
