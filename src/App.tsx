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
      sessionToken: localStorage.getItem("token")
    }
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem('token', newToken)
    this.setState({ sessionToken: newToken })
  }

  setView = () => {
    let display
    if (this.state.sessionToken === "") {
      display = <Auth updateToken={this.updateToken} />
    } else display = 
    <Router>
      <Sitebar updateToken={this.updateToken} />
    </Router>
    return (display)
  }

  render() {
    return (
      <div className="App">
        {this.setView()}
      </div>
    )
  };
}

export default App;
