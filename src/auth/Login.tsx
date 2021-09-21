import React from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

type props = {
    testProp?: string
}

type state = {
   username: string,
   password: string
}

class Login extends React.Component {

    constructor(props: props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input name="username" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input name="password"/>
                    </FormGroup>
                    <Button type="submit">Login</Button>
                </Form>
            </div>
        )
    }
}

export default Login