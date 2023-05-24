import {useState} from 'react'
import Greetings from './components/Greetings'
import './App.css'

const languageGreetingsList = [
  {
    id: 'bfdf40eb-eec9-4a66-a493-752fe689f0d0',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/english-greetings-img.png',
    buttonText: 'English',
    imageAltText: 'english',
  },
  {
    id: '0ceda891-2a0c-49e2-8c62-68e78180bac6',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/tamil-greetings-img.png',
    buttonText: 'Tamil',
    imageAltText: 'tamil',
  },
  {
    id: '89537778-7a46-4c58-988c-0adc931d087c',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/telugu-greetings-img.png',
    buttonText: 'Telugu',
    imageAltText: 'telugu',
  },
]

const App = () => {
  const [idElement, setIdElement] = useState(languageGreetingsList[0].id)

  const changeLanguage = id => {
    setIdElement(id)
  }

  const getGreetings = () => {
    const greet = languageGreetingsList.find(each => each.id === idElement)
    return greet
  }
  const {imageUrl, imageAltText} = getGreetings()

  return (
    <div className="container">
      <h1 className="heading">Multilingual Greetings</h1>
      <ul className="list-container">
        {languageGreetingsList.map(each => (
          <Greetings
            greetingDetails={each}
            key={each.id}
            activeLanguage={idElement === each.id}
            changeLanguage={changeLanguage}
          />
        ))}
      </ul>
      <img src={imageUrl} alt={imageAltText} className="image" />
    </div>
  )
}

export default App
