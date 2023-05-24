import LanguageContext from '../../context/LanguageContext'
import './index.css'

const langOptions = [
  {id: 1, value: 'EN', language: 'English'},
  {id: 2, value: 'TA', language: 'Tamil'},
  {id: 3, value: 'TE', language: 'Telugu'},
]

const Header = () => (
  <LanguageContext.Consumer>
    {value => {
      const {activeLanguage, changeLanguage} = value
      const onChangeLanguage = event => {
        changeLanguage(event.target.value)
      }

      return (
        <>
          <div className="main-heading">
            <h1 className="heading">Multilingual Greetings</h1>
          </div>
          <select
            className="language-text"
            value={activeLanguage}
            onChange={onChangeLanguage}
          >
            {langOptions.map(eachOption => (
              <option key={eachOption.id} value={eachOption.value}>
                {eachOption.language}
              </option>
            ))}
          </select>
        </>
      )
    }}
  </LanguageContext.Consumer>
)

export default Header
