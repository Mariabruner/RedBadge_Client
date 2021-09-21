import React from 'react'
import Signup from './Signup'
import Login from './Login'

class Auth extends React.Component {
 
    render(){
        return(
            <div>
                <Signup />
                <Login />
            </div>
        )
    }
}

export default Auth