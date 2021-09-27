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
const modalStyle = {
    "backgroundColor": "#457B9D",
    "color": "#F1FAEE",
    "width": "75vw",
    "height": "100vh",
    "margin-left": "auto",
    "margin-right": "auto",
    "font-size": "20px",
    "display": "flex",
    "flex-direction": "row",
    "justify-content": "center",
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
            <div>
                <Modal isOpen={true} style={modalStyle} backdrop="static">
                    <ModalHeader>Who Would Win in a Fight?</ModalHeader>
                        <p> Create an Account </p> 

                        <Signup updateToken={this.props.updateToken} modal={this.state.modal}/>
                        <br />
                        
                        <p> Already Have an Account? </p>
                        <Login updateToken={this.props.updateToken}/>
                </Modal>
            </div>
        )
    }
}

export default Auth