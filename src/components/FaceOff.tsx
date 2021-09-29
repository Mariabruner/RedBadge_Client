import React from 'react'
import { Button } from 'reactstrap'

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
        fetch(`http://localhost:3000/character/`, {
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

                if (randomCharacter1.id < randomCharacter2.id){
                    this.setState({
                            charOneImage: randomCharacter1.imageURL,
                            charTwoImage: randomCharacter2.imageURL,
                            charOneId: randomCharacter1.id,
                            charTwoId: randomCharacter2.id,
                            charOneName: randomCharacter1.name,
                            charTwoName: randomCharacter2.name
                        })
                } else if (randomCharacter1.id > randomCharacter2.id){
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

        fetch(`http://localhost:3000/fight/create`, {
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
        fetch(`http://localhost:3000/character/updateFights/${this.state.charOneId} `, {
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
        fetch(`http://localhost:3000/character/updateFights/${this.state.charTwoId}`, {
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
        fetch(`http://localhost:3000/character/updateVotes/${winner}`, {
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
        fetch(`http://localhost:3000/fight/updateWins/${winner}/${this.state.charOneId}/${this.state.charTwoId}`, {
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
            <div>
                Battle Page!
                <div onClick={() => this.updateCharacters(this.state.charOneId)} >Character One: {this.state.charOneName} {this.state.charOneImage}</div>
                <div onClick={() => this.updateCharacters(this.state.charTwoId)}> Character Two: {this.state.charTwoName} {this.state.charTwoImage}</div>
            </div>
        )
    }

    componentDidMount() {
        this.getAll()
    }
}

export default FaceOff