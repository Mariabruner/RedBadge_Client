import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import NewCharacter from './NewCharacter'
import APIURL from '../helpers/environment'


type props = {

}

type state = {
    accessToken: string | null,
    charOneImage: string,
    charTwoImage: string,
    charOneId: number,
    charTwoId: number,
    charOneName: string,
    charTwoName: string
}

const pageStyle = {
    "color": "#1D3557",
    "backgroundColor": "#F1FAEE",
    "height": "100vh",
}

const topDiv = {
    "paddingTop": "5vh",
    "font-size": "35px",
    "color": "#1D3557",
    "font-family": "Black Ops One"
}

const fightStyle = {
    "marginTop": "10vh",
    "display": "flex",
    "alignContent": "center",
    "font-family": "Hammersmith One"
}


const characterStyle = {
    "backgroundColor": "#A8DADC",
    "marginLeft": "auto",
    "marginRight": "auto",
    "marginBottom": "7vh",
    "width": "40vw",
    "height": "25vh",
    "color": "#1D3557",
    "border": "1px solid #F1FAEE",
    "borderRadius": "10px",
    "fontSize": "20px",
    "paddingTop": "5px",
}

const buttonStyle = {
    "marginTop": "10vh",
    "color": "#1D3557",
    "backgroundColor": "#A8DADC",
    "border": "solid 2px #F1FAEE",
    "borderRadius": "10px",
    "font-family": "Hammersmith One",
    "text-decoration": "none",
    "padding": "3px"
}



class FaceOff extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            accessToken: localStorage.getItem("token"),
            charOneImage: "",
            charTwoImage: "",
            charOneId: 0,
            charTwoId: 0,
            charOneName: "",
            charTwoName: ""
        }
    }

    getAll = () => {
        fetch(`${APIURL}/character/`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.accessToken}`
            })
        })
            .then(response => response.json())
            .then(data => {

                let randomNumber1 = Math.floor(Math.random() * (data.length))
                let randomNumber2 = Math.floor(Math.random() * (data.length))

                while (randomNumber1 === randomNumber2) {
                    randomNumber2 = Math.floor(Math.random() * data.length)
                }

                let randomCharacter1 = data[randomNumber1]
                let randomCharacter2 = data[randomNumber2]

                if (randomCharacter1.id < randomCharacter2.id) {
                    this.setState({
                        charOneImage: randomCharacter1.imageURL,
                        charTwoImage: randomCharacter2.imageURL,
                        charOneId: randomCharacter1.id,
                        charTwoId: randomCharacter2.id,
                        charOneName: randomCharacter1.name,
                        charTwoName: randomCharacter2.name
                    })
                } else if (randomCharacter1.id > randomCharacter2.id) {
                    this.setState({
                        charOneImage: randomCharacter2.imageURL,
                        charTwoImage: randomCharacter1.imageURL,
                        charOneId: randomCharacter2.id,
                        charTwoId: randomCharacter1.id,
                        charOneName: randomCharacter2.name,
                        charTwoName: randomCharacter1.name
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    updateCharacters = (winner: number) => {
        //create a new fight if one does not exist

        let newEntry = {
            fight: {
                characterOneId: this.state.charOneId,
                characterTwoId: this.state.charTwoId
            }
        }

        fetch(`${APIURL}/fight/create`, {
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

        //update char one's fight appearances
        fetch(`${APIURL}/character/updateFights/${this.state.charOneId} `, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.accessToken} `
            }),
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(err => {
                console.log(err)
            })

        //udpate char two's fight appearances
        fetch(`${APIURL}/character/updateFights/${this.state.charTwoId}`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.accessToken}`
            }),
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(err => {
                console.log(err)
            })

        //update winning character's vote count
        fetch(`${APIURL}/character/updateVotes/${winner}`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.accessToken}`
            }),
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(err => {
                console.log(err)
            })

        //update number of face offs and winner fight count in fights table
        fetch(`${APIURL}/fight/updateWins/${winner}/${this.state.charOneId}/${this.state.charTwoId}`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.accessToken}`
            }),
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(err => {
                console.log(err)
            })

        this.getAll()
    }


    render() {
        return (
            <div style={pageStyle}>

                <div style={topDiv}>Who Would Win?</div>
                <div style={fightStyle}>
                    <div style={characterStyle} onClick={() => this.updateCharacters(this.state.charOneId)} >
                        <div>
                            {this.state.charOneName}
                        </div>
                        <div>
                            {this.state.charOneImage}
                        </div>
                    </div>
                    <div style={characterStyle} onClick={() => this.updateCharacters(this.state.charTwoId)}>
                        <div>
                            {this.state.charTwoName}
                        </div>
                        <div>
                            {this.state.charOneImage}
                        </div>
                    </div>
                </div>
                <Link to="/newcharacter" style={buttonStyle}> Send in Your Character Ideas! </Link>
            </div>
        )
    }

    componentDidMount() {
        this.getAll()
    }
}

export default FaceOff