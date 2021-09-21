import { stringify } from 'querystring'
import React from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { isPropertySignature } from 'typescript'

type props = {
    testProp?: string
}

type state = {
    username: string | null,
    password: string
 }

class Signup extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }
 
    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(this.state.username, this.state.password)
    }

    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input onChange={(e) => this.setState({ username: e.target.value })} name="username" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input onChange={(e) => this.setState({ password: e.target.value })} name="password"/>
                    </FormGroup>
                    <Button type="submit">Signup</Button>
                </Form>
            </div>
        )
    }
}

export default Signup