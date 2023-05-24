import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import InstaContext from './context/InstaContext'

import './App.css'

class App extends Component {
  state = {isDarkTheme: false}

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  render() {
    const {isDarkTheme} = this.state

    return (
      <>
        <InstaContext.Provider
          value={{
            isDarkTheme,
            toggleTheme: this.toggleTheme,
          }}
        >
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/my-profile" component={MyProfile} />
            <ProtectedRoute
              exact
              path="/users/:userId"
              component={UserProfile}
            />
            <Route path="./not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </InstaContext.Provider>
      </>
    )
  }
}

export default App
