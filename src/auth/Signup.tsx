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
                        <Input onChange={(e) => this.setState({ password: e.target.value })} name="password" />
                    </FormGroup>
                    <Button type="submit">Signup</Button>
                </Form>
            </div>
        )
    }
}

export default Signup