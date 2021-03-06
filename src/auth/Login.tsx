import React from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { isPropertySignature } from 'typescript'
import APIURL from '../helpers/environment'

type props = {
    updateToken(sessionToken: string): void
}

type state = {
    email: string | null,
    password: string
 }

const pageStyle = {
    "marginTop": 0,
    "font-family": "Hammersmith One",
    "padding": "7px",
    "display" : "flex",
    "flex-direction": "column",
}

const labelStyle = {
    "padding": "5px"
}

const inputStyle = {
    "width": "25vw",
    "border": "1px solid #1D3557",
    "borderRadius": "5px"
}

const buttonStyle = {
    "height": "4vh",
    "color": "#F1FAEE",
    "backgroundColor": "#1D3557",
    "border": "solid 2px #1D3557",
    "borderRadius": "10px",
    "font-family": "Hammersmith One",
    "marginTop": "7px"
}

class Login extends React.Component<props, state> {

    constructor(props: props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit= (e: React.FormEvent) => {
        e.preventDefault()
        fetch(`${APIURL}/user/login`, {
            method: "POST",
            body: JSON.stringify({user:{email: this.state.email, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }) .then(
            (response) => response.json()
        ) .then((data) => {
            this.props.updateToken(data.sessionToken)

            if (data.message === "Incorrect email or password") {
                alert(data.message)
            }
        })
    }

   
    render() {
        return (
            <div style={pageStyle}>
                Login:
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label style={labelStyle} htmlFor="username">E-Mail</Label>
                        <Input style={inputStyle} onChange={(e) => this.setState({ email: e.target.value })} name="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label style={labelStyle} htmlFor="password">Password</Label>
                        <Input style={inputStyle} type="password" onChange={(e) => this.setState({ password: e.target.value })} name="password"/>
                    </FormGroup>
                    <Button style={buttonStyle} type="submit">Login</Button>
                </Form>
            </div>
        )
    }
}

export default Login