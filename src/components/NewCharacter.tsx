import React, { ReactNode } from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import APIURL from '../helpers/environment'

type props = {

}

type state = {
    accessToken: string | null,
    admin: boolean,
    characterName: string
    imageURL: string
    characterType: string
}


class NewCharacter extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            accessToken: localStorage.getItem("token"),
            admin: false,
            characterName: "",
            imageURL: "",
            characterType: ""
        }
    }


    checkAdmin = () => {
        fetch(`${APIURL}/character/checkAdmin`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.accessToken}`
            })
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ admin: data.user.admin })

            })
    }

    addCharacter = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(this.state.characterName, this.state.characterType, this.state.imageURL)

        let newEntry = {
            character: {
                name: this.state.characterName,
                imageURL: this.state.imageURL,
                characterType: this.state.characterType
            }
        }

        fetch(`${APIURL}/character/create`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.accessToken}`
            }),
            body: JSON.stringify(newEntry)
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        if (this.state.admin) {
        return (
            <div> HELLOOOO FROM ADMIN
                <Form onSubmit = {this.addCharacter}>
                <FormGroup>
                        <Label htmlFor="characterName">New Character's Name :</Label>
                        <Input onChange={(e) => this.setState({ characterName: e.target.value })} name="Character Name"/>
                        <Label htmlFor="characterName">New Character's Type :</Label>
                        <Input onChange={(e) => this.setState({ characterType: e.target.value })} name="Character Name"/>
                        <Label htmlFor="characterName">New Character's Image URL :</Label>
                        <Input onChange={(e) => this.setState({ imageURL: e.target.value })} name="Character Name"/>
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
        } else {
            return (
                <div> 
                    Send your ideas for new characters to mariab2898@gmail.com!
                </div>
            )
        }
    }

    componentDidMount() {
        this.checkAdmin()
    }

}

export default NewCharacter