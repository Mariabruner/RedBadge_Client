import React from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { isPropertySignature } from 'typescript'

type props = {
    updateToken(sessionToken: string): void
}

type state = {
    email: string | null,
    password: string
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
        console.log(this.state.email, this.state.password)
        fetch("http://localhost:3000/user/login", {
            method: "POST",
            body: JSON.stringify({user:{email: this.state.email, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }) .then(
            (response) => response.json()
        ) .then((data) => {
            this.props.updateToken(data.sessionToken)
        })
    }

   
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="username">E-Mail</Label>
                        <Input onChange={(e) => this.setState({ email: e.target.value })} name="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input onChange={(e) => this.setState({ password: e.target.value })} name="password"/>
                    </FormGroup>
                    <Button type="submit">Login</Button>
                </Form>
            </div>
        )
    }
}

export default Login