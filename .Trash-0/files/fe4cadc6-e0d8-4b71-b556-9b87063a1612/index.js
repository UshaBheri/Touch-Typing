import {Component} from 'react'
import Greetings from '../Greetings'
import './index.css'

class MultilingualGreetings extends Component {
  state = {
    activeLanguage: 'EN',
  }

  changeLanguage = () => {
    this.setState(prevState => ({activeLanguage: prevState.activeLanguage}))
  }

  render() {
    const {languageGreetingsList} = this.props
    const {activeLanguage} = this.state

    return (
      <div className="main-container">
        <h1 className="main-heading">Multilingual Greetings</h1>
        <p className="language">{activeLanguage}</p>
        <ul className="list-container">
          {languageGreetingsList.map(eachGreet => (
            <Greetings
              key={eachGreet.id}
              greetingDetails={eachGreet}
              changeLanguage={this.changeLanguage}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default MultilingualGreetings
