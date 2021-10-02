import React from 'react';
import './App.css';
import Sitebar from './components/Sitebar'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import Auth from './auth/Auth'
import FaceOff from './components/FaceOff';

type props = {
  testProp?: string
}

type state = {
  sessionToken: string | null
}

class App extends React.Component<props, state>{

  constructor(props: props) {
    super(props)
    this.state = {
      sessionToken: localStorage.getItem('token')
    }
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem('token', newToken)
    this.setState({ sessionToken: newToken })
    console.log(this.state.sessionToken)
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({sessionToken: ""})
  }

  protectedViews = () => {
    console.log(this.state.sessionToken)
    let display
      display = this.state.sessionToken === localStorage.getItem('token') ? <Sitebar clickLogout={this.clearToken} updateToken={this.updateToken}/>
      : <Auth updateToken={this.updateToken} />
      return (display)
  }

  render() {
    return (
      <div className="App">
        <Router>
       {this.protectedViews()}
       </Router>
      </div>
    )
  };

}

export default App;
