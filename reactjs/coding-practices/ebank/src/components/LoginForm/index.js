import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    isValid: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onChangePin = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({
      isValid: true,
      errorMsg,
    })
  }

  BankLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, isValid, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-con">
        <div className="ct-con">
          <div className="im-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="ima"
            />
          </div>
          <form className="form-el" onSubmit={this.BankLogin}>
            <h1 className="header"> Welcome Back! </h1>
            <div className="inp-con">
              <label htmlFor="user" className="lab">
                User ID
              </label>
              <input
                id="user"
                placeholder="Enter User ID"
                className="inp"
                type="text"
                value={userId}
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="inp-con">
              <label htmlFor="pin" className="lab">
                PIN
              </label>
              <input
                placeholder="Enter Pin"
                id="pin"
                className="inp"
                type="password"
                value={pin}
                onChange={this.onChangePin}
              />
            </div>
            <button className="but" type="submit">
              Login
            </button>
            <div className="ct">
              {isValid === true && <p className="ep"> {errorMsg} </p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
