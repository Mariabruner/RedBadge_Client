import React from 'react';
import './App.css';
import Sitebar from './components/Sitebar'
import { 
  BrowserRouter as Router
} from 'react-router-dom'

type props = {
 testProp?: string
}

type state = {
 sessionToken: string | null
}

class App extends React.Component<props, state>{

  constructor(props: props){
    super(props)
    this.state = {
      sessionToken: ""
    }
  }

  getToken = () => {
    if (localStorage.getItem("token")){
      this.setState({sessionToken: localStorage.getItem("token")})
    }
  }


  updateToken = (newToken: string):void => {
    localStorage.setItem('token', newToken)
    this.setState({sessionToken: newToken})
  }


  render() {
    return(
    <div className="App">
      <Router>
        <Sitebar updateToken={this.updateToken}/>
      </Router>
    </div>
  )};
}

export default App;
