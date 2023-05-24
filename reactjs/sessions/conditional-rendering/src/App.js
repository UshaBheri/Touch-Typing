import {Component} from 'react'

import Welcome from './components/Welcome'

import './App.css'

class App extends Component {
  state = {
    isLoggedIn: false,
  }
  /*state = {
    isLoggedIn: true,
  }*/
  //renderAuthbutton = () => {
  //const {isLoggedIn} = this.state
  //if (isLoggedIn === true) {
  //return <button>Logout</button>
  //}
  //return <button>Login</button>
  //}

  /*let authButton;
    const {isLoggedIn} = this.state
    if (isLoggedIn === true) {
      /
      authButton = <button>Logout</button>
    }else{
      authButton = <button>Login</button>
    }*/

  render() {
    return (
      <div className="container">
        <Welcome greeting="Hello" name="User" />
        //{authButton}
        //{this.renderAuthbutton()}
        //{isLoggedIn ? <button>Logout</button> : <button>Login</button>}
        //{isLoggedIn ? <button>Logout</button> : null}
        {isLoggedIn && <button>Logout</button>}
        {!isLoggedIn && <button>Login</button>}
      </div>
    )
  }
}

export default App
