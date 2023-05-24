import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TravelPlace from '../TravelPlace'

import './index.css'

// Replace your code here
class TravelList extends Component {
  state = {isLoading: true, travelData: []}

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    const formattedData = data.packages.map(eachPlace => ({
      id: eachPlace.id,
      name: eachPlace.name,
      imageUrl: eachPlace.image_url,
      description: eachPlace.description,
    }))
    this.setState({travelData: formattedData, isLoading: false})
  }

  render() {
    const {travelData, isLoading} = this.state
    return (
      <div className="travel-list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          travelData.map(place => (
            <TravelPlace travelDetails={place} key={place.id} />
          ))
        )}
      </div>
    )
  }
}

export default TravelList
