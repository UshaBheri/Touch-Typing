import {Component} from 'react'
import './index.css'

const countryAndCapitalsList = [
  {
    id: 'NEW_DELHI',
    capitalDisplayText: 'New Delhi',
    country: 'India',
  },
  {
    id: 'LONDON',
    capitalDisplayText: 'London',
    country: 'United Kingdom',
  },
  {
    id: 'PARIS',
    capitalDisplayText: 'Paris',
    country: 'France',
  },
  {
    id: 'KATHMANDU',
    capitalDisplayText: 'Kathmandu',
    country: 'Nepal',
  },
  {
    id: 'HELSINKI',
    capitalDisplayText: 'Helsinki',
    country: 'Finland',
  },
]

class Capitals extends Component {
  state = {
    activeState: countryAndCapitalsList[0].id,
  }

  onChangeCapital = event => {
    this.setState({activeState: event.target.value})
  }

  getCountry = () => {
    const {activeState} = this.state
    const activeCountryAndCapital = countryAndCapitalsList.find(
      eachCapital => eachCapital.id === activeState,
    )
    return activeCountryAndCapital.country
  }

  render() {
    const {activeState} = this.state
    const country = this.getCountry(activeState)

    return (
      <div className="container">
        <div className="card-container">
          <h1 className="heading">Countries and Capitals</h1>
          <div className="questions-container">
            <select
              className="capital-select"
              onChange={this.onChangeCapital}
              value={activeState}
            >
              {countryAndCapitalsList.map(eachCapital => (
                <option
                  key={eachCapital.id}
                  value={eachCapital.id}
                  className="option"
                >
                  {eachCapital.capitalDisplayText}
                </option>
              ))}
            </select>
            <p className="description">is capital of which country?</p>
          </div>
          <p className="country">{country}</p>
        </div>
      </div>
    )
  }
}

// Write your code here
export default Capitals
