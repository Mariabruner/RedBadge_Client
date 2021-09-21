import React from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './auth/Auth'
import { isPropertySignature } from 'typescript';

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

  //create update token function
  getToken = () => {
    if (localStorage.getItem("token")){
      this.setState({sessionToken: localStorage.getItem("token")})
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken)
    this.setState({sessionToken: newToken})
    console.log(this.state.sessionToken)
  }

  render() {
    return(
    <div className="App">
      <Auth />
    </div>
  )};
}

export default App;
