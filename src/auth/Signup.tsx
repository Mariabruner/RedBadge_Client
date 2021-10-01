import { stringify } from 'querystring'
import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { isPropertySignature, updateShorthandPropertyAssignment } from 'typescript'
import APIURL from '../helpers/environment'

type props = {
    updateToken(sessionToken: string): void,
    modal: boolean
}

type state = {
    email: string | null,
    password: string,
    confirmPassword: string,
    emailValid: boolean,
    passwordValid: boolean,
    confirmPasswordValid: boolean
}

const pageStyle = {
    "marginTop": "0px",
    "fontFamily": "Hammersmith One",
    "padding": "7px"
}

const labelStyle = {
    "padding": "5px",
    "fontSize": "20px"
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

class Signup extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            emailValid: false,
            passwordValid: false,
            confirmPasswordValid: false
            }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({user:{email: this.state.email, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken)

            if (data.message === "Email already in use"){
                alert(data.message)
            }
        })
    }

    render() {
        return (
            <div style={pageStyle}>
                Sign Up:
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label style = {labelStyle} htmlFor="username">E-Mail</Label>
                        <Input style={inputStyle} onChange={(e) => {
                            this.setState({ email: e.target.value })
                            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                           
                            if (re.test(e.target.value)){
                                console.log("valid email")
                                this.setState({ emailValid: true })
                            } else {
                                console.log("please enter a valid email address")
                                this.setState({ emailValid: false })
                            }

                        }} name="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label style = {labelStyle} htmlFor="password">Password</Label>
                        <Input style={inputStyle} type="password" onChange={(e) => this.setState({ password: e.target.value })} name="password" />
                        <br />
                        <Label style = {labelStyle} htmlFor="password">Verify Password</Label>
                        <Input style={inputStyle} type="password" onChange={(e) => this.setState({ confirmPassword: e.target.value })} name="password" />
                    </FormGroup>
                    <Button style={buttonStyle} type="submit" disabled={this.state.emailValid  ? false : true}>Signup</Button>
                </Form>
            </div>
        )
    }
}

export default Signup