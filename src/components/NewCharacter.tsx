import React, { ReactNode } from 'react'
import { Form, FormGroup, Label, Input, Button, NavbarBrand } from 'reactstrap'
import APIURL from '../helpers/environment'

type props = {

}

type state = {
    accessToken: string | null,
    admin: boolean,
    characterName: string
    imageURL: string
    characterType: string,
    suggestion: string,
    verification: string
}

const pageStyle = {
    "backgroundColor": "#F1FAEE",
    "height": "100vh",
    "display": "flex",
    "flex-direction": "column",
    "padding": "10px",
    "font-family": "Hammersmith One",
    "color": "#1D3557"
}

const formStyle = {
    "display": "flex",
    "flex-direction": "column",
    "width": "50vw",
    "marginLeft": "auto",
    "marginRight": "auto",
    "marginTop": "5vh"
}

const inputStyle = {
    "justifySelf": "center",
    "alignSelf": "center",
    "width": "50vw",
    "marginTop": "3px",
    "marginBottom": "10px",
    "border": "solid 2px #1D3557",
    "borderRadius": "10px"
}

const labelStyle = {
    "marginTop": "10px",
    "fontSize": "15px",
}

const buttonStyle = {
    "marginTop": "10px",
    "height": "4vh",
    "align-self": "center",
    "color": "#F1FAEE",
    "backgroundColor": "#E63946",
    "border": "solid 2px #E63946",
    "borderRadius": "10px",
    "font-family": "Hammersmith One",
}

class NewCharacter extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            accessToken: localStorage.getItem("token"),
            admin: false,
            characterName: "",
            imageURL: "",
            characterType: "",
            suggestion: "",
            verification: ""
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
                <div style={pageStyle}>
                    <Form onSubmit={this.addCharacter}>
                        <Label style={labelStyle}>Enter the information of the new character: </Label>
                        <FormGroup style={formStyle}>
                            <Label style={labelStyle}>New Character's Name :</Label>
                            <Input style={inputStyle} onChange={(e) => this.setState({ characterName: e.target.value })} name="Character Name" />
                            <Label style={labelStyle}>New Character's Type :</Label>
                            <Input style={inputStyle} onChange={(e) => this.setState({ characterType: e.target.value })} name="Character Name" />
                            <Label style={labelStyle}>New Character's Image URL :</Label>
                            <Input style={inputStyle} onChange={(e) => this.setState({ imageURL: e.target.value })} name="Character Name" />
                        </FormGroup>
                        <Button style={buttonStyle} type="submit">Submit</Button>
                    </Form>
                </div>
            )
        } else {
            return (
                <div style={pageStyle}>
                       <p>Send in your character ideas to mariab289@gmail.com! </p>
                </div>
            )
        }
    }

    componentDidMount() {
        this.checkAdmin()
    }

}

export default NewCharacter