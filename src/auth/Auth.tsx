import React from 'react'
import Signup from './Signup'
import Login from './Login'
import { isPropertySignature } from 'typescript'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


type props = {
    updateToken(sessionToken: string): void
}

type state = {
    modal: boolean
}


//styling
const pageStyle = {
    "backgroundColor": "#A8DADC",
    "color": "#1D3557",
    "height": "100vh",
    "font-size": "20px",
    "marginTop": "0",
    "paddingTop": "10vh",
    "font-family": "Hammersmith One",
    "display": "flex",
    "flex-direction": "column"
}

const loginCard = {
    "backgroundColor": "#F1FAEE",
    "width": "75vw",
    "align-self": "center",
    "border": "2px solid #A8DADC",
    "border-radius": "10px",
    "padding": "5px",
    "marginTop": "10px",
    "display": "flex",
    "flex-direction": "column",
}


class Auth extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            modal: true
        }
    }

    render() {
        return (
            <div style={pageStyle}>
                        Sign Up or Log In to Continue
                        <div style = {loginCard}>
                        <Signup updateToken={this.props.updateToken} modal={this.state.modal}/>
                        <br />    
                        <Login updateToken={this.props.updateToken}/>
                        </div>
            </div>
        )
    }
}

export default Auth