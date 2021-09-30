import { stringify } from 'querystring'
import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { isPropertySignature, updateShorthandPropertyAssignment } from 'typescript'

type props = {
    updateToken(sessionToken: string): void,
    modal: boolean
}

type state = {
    email: string | null,
    password: string,
    modal: boolean
}

const pageStyle = {
    "marginTop": "0px",
    "fontFamily": "Hammersmith One",
    "padding": "7px"
}

const labelStyle = {
    "padding": "5px"
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
            modal: this.props.modal
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        fetch("http://localhost:3000/user/register", {
            method: 'POST',
            body: JSON.stringify({user:{email: this.state.email, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken)

            if (data.message === "Email already in use" || "Failed to register user"){
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
                        <Input onChange={(e) => this.setState({ email: e.target.value })} name="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label style = {labelStyle} htmlFor="password">Password</Label>
                        <Input type="password" onChange={(e) => this.setState({ password: e.target.value })} name="password" />
                    </FormGroup>
                    <Button style={buttonStyle} type="submit">Signup</Button>
                </Form>
            </div>
        )
    }
}

export default Signup