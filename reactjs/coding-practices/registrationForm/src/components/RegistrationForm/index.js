// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstNameInput: '',
    lastNameInput: '',
    firstNameError: false,
    LastNameError: false,
    isFormSubmitted: false,
  }

  onSubmitSuccess = event => {
    event.preventDefault()
    const isValidLastName = this.isValidLastName()
    const isValidFirstName = this.isValidFirstName()

    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        firstNameError: isValidFirstName,
        LastNameError: isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  onChangeFirstName = event => {
    this.setState({firstNameInput: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastNameInput: event.target.value})
  }

  onBlurLastName = () => {
    const isValidLastName = this.isValidLastName()

    this.setState({LastNameError: !isValidLastName})
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.isValidFirstName()

    this.setState({firstNameError: !isValidFirstName})
  }

  renderFirstName = () => {
    const {firstNameInput, firstNameError} = this.state
    const className = firstNameError ? 'error-name' : 'name-input'

    return (
      <>
        <label className="input" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          type="firstName"
          id="firstName"
          placeholder="First name"
          className={className}
          value={firstNameInput}
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </>
    )
  }

  renderLastName = () => {
    const {lastNameInput, LastNameError} = this.state
    const className = LastNameError ? 'error-name' : 'name-input'

    return (
      <>
        <label className="input" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Last name"
          className={className}
          value={lastNameInput}
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
      </>
    )
  }

  isValidLastName = () => {
    const {lastNameInput} = this.state

    return lastNameInput !== ''
  }

  isValidFirstName = () => {
    const {firstNameInput} = this.state

    return firstNameInput !== ''
  }

  renderRegistration = () => {
    const {firstNameError, LastNameError} = this.state

    return (
      <form className="form-container" onSubmit={this.onSubmitSuccess}>
        {this.renderFirstName()}
        {firstNameError && <p className="error-msg">Required</p>}
        {this.renderLastName()}
        {LastNameError && <p className="error-msg">Required</p>}
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    )
  }

  onClickSubmit = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstNameInput: '',
      lastNameInput: '',
    }))
  }

  renderSubmitSuccess = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png "
        className="img"
        alt="success"
      />
      <p className="success">Submitted Successfully</p>
      <button type="button" className="button" onClick={this.onClickSubmit}>
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="registration-container">
        <h1 className="heading">Registration</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmitSuccess()
            : this.renderRegistration()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
