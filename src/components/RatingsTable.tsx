import React, { FunctionComponent, MouseEventHandler, ReactElement, ReactNode } from 'react'
import {
    Table,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import { JsxElement } from 'typescript'
import APIURL from '../helpers/environment'


type props = {

}

type state = {
    accessToken: string | null,
    characterData: character[],
    characterOneName: string,
    characterTwoName: string,
    fightInfo: fight,
    idsSwitched: boolean,
    firstEntered: string,
    errorMessage: string,
    sortedField: string
}

type character = {
    characterType: string,
    createdAt: string,
    fightAppearances: number,
    id: number,
    imageURL: string,
    name: string,
    updatedAt: string,
    votes: number
}

type fight = {
    characterOneId: number,
    characterOneWins: number,
    characterTwoId: number,
    characterTwoWins: number,
    createdAt: string,
    id: number,
    numFaceOffs: number,
    udpatedAt: string
}

const pageStyle = {
    "backgroundColor": "#F1FAEE",
    "height": "100vh",
    "paddingTop": "5vh"
}

const tableStyle = {
    "color": "#1D3557",
    "fontSize": "20px",
    "fontFamily": "Hammersmith One",
    "marginLeft": "auto",
    "marginRight": "auto",
    "border": "1px solid #1D3557",
    "borderRadius": "5px",
    "marginBottom": "50px"
}

const nameStyle = {
    "width": "50%",
    "border": "1px solid #1D3557",
    "text-align": "left",
    "borderRadius": "5px"
}

const voteStyle = {
    "width": "20%",
    "border": "1px solid #1D3557",
    "borderRadius": "5px"
}

const winStyle = {
    "width": "30%",
    "border": "1px solid #1D3557",
    "borderRadius": "5px"
}

const inputStyle = {
    "border": "1px solid #1D3557",
    "borderRadius": "5px",
    "margin": "1px",
    "height": "25px",
    "font-family": "Hammersmith One"
}

const buttonStyle = {
    "height": "4vh",
    "color": "#F1FAEE",
    "backgroundColor": "#1D3557",
    "border": "solid 2px #1D3557",
    "borderRadius": "10px",
    "font-family": "Hammersmith One",
    "margin": "15px"
}

const pStyle = {
    "font-family": "Hammersmith One",
    "color": "#1D3557",
    "width": "75vw",
    "marginLeft": "auto",
    "marginRight": "auto",
    "marginTop": "10px"
}

const resultsStyle = {
    "font-family": "Hammersmith One",
    "width": "80%",
    "padding": "10px",
    "marginRight": "auto",
    "marginLeft": "auto",
    "border": "1px solid #1D3557",
    "borderRadius": "5px",
    "backgroundColor": "#1D3557",
    "color": "#F1FAEE",
    "marginBottom": "25px"
}

const topLineStyle = {
    "fontSize": "20px",
    "Margin": "5px",
    "width": "90%",
    "MarginLeft": "2px",
    "MarginTop": "5px",
    "MarginBottom": "5px"
}

const percentageStyle = {
    "fontSize": "15px",
    "width": "90%",
    "MarginLeft": "auto",
    "MarginRight": "auto",
    "MarginTop": "5px",
    "MarginBottom": "5px"
}

const formStyle = {
    "backgroundColor": "#E63946",
    "width": "80vw",
    "marginLeft": "auto",
    "marginRight": "auto",
    "borderRadius": "5px",
    "border": "1px solid #1D3557",
    "marginTop": "25px",
    "marbinBottom": "25px"
}

const emptyStyle = {
    "height": "25vh",
    "backgroundColor": "#F1FAEE"
}

class RatingsTable extends React.Component<props, state> {
    constructor(props: props) {
        super(props)

        this.state = {
            accessToken: localStorage.getItem("token"),
            characterData: [],
            characterOneName: "",
            characterTwoName: "",
            fightInfo: {
                characterOneId: 0,
                characterOneWins: 0,
                characterTwoId: 0,
                characterTwoWins: 0,
                createdAt: "",
                id: 0,
                numFaceOffs: 0,
                udpatedAt: "string"
            },
            idsSwitched: false,
            firstEntered: "",
            errorMessage: ""   ,
            sortedField: "name" 
        }

    }

    getCharacters = () => {
        fetch(`${APIURL}/character/`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.accessToken}`
            })
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ characterData: data })
            })
    }


    createTable = (): ReactNode => {
        let list: ReactElement[] = []


        list = this.state.characterData.map(function (item: character) {
            let winPercentage = ((item.votes / item.fightAppearances) * 100).toFixed(2)

            return (
                <tr>
                    <td style={nameStyle}>{item.name}</td>
                    <td style={voteStyle}> {item.votes}</td>
                    <td style={winStyle}>{winPercentage}</td>
                </tr>
            )
        })
        
        return list
    }

    createDropdown = (): ReactNode => {

        let list: ReactElement[] = this.state.characterData.map(function (item: character) {
            return (
                <DropdownItem>{item.name}</DropdownItem>
            )
        })
        return (list)
    }

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const characterOne = await fetch(`${APIURL}/character/getByName/${this.state.characterOneName}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.accessToken}`
            })
        }).then(
            (response) => response.json()
        ).catch((err) => {
        })

        const characterTwo = await fetch(`${APIURL}/character/getByName/${this.state.characterTwoName}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.state.accessToken}`
            })
        }).then(
            (response) => response.json()
        ).catch((err) => {
        })

        let char1id
        let char2id

        try {
            if (characterOne.id > characterTwo.id) {
                char1id = characterTwo.id
                char2id = characterOne.id
                this.setState({
                    idsSwitched: true,
                })

            } else {
                char1id = characterOne.id
                char2id = characterTwo.id
                this.setState({ idsSwitched: false })
            }} catch (err) {
                this.setState({  errorMessage: "Double check your spelling and capitalization of both characters" })
            }

            const fightInfo = await fetch(`${APIURL}/fight/find/${char1id}/${char2id}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.state.accessToken}`
                })
            }).then(
                (response) => response.json()
            ).catch((err) => {
                this.setState({ errorMessage: "These two characters have not met yet"})
            }
            )

            this.setState({ fightInfo: fightInfo })
        }

    showStatistics = () => {
            let fight = this.state.fightInfo

            if (fight.characterOneId && fight.characterTwoId !== 0) {

                let charOnePercentage = ((fight.characterOneWins / fight.numFaceOffs) * 100).toFixed(2)
                let charTwoPercentage = ((fight.characterTwoWins / fight.numFaceOffs) * 100).toFixed(2)

                if (this.state.idsSwitched == true) {
                    return (
                        <div style={resultsStyle}>
                            <div style={topLineStyle}>{this.state.characterOneName} and {this.state.characterTwoName} have met {fight.numFaceOffs} times</div>
                            <hr />
                            <div style={percentageStyle}>{this.state.characterTwoName}'s win percentage: {charTwoPercentage}%</div>
                            <div style={percentageStyle}> {this.state.characterOneName}'s win percentage: {charOnePercentage}%</div>
                        </div>
                    )
                } else if (this.state.idsSwitched == false) {
                    return (
                        <div style={resultsStyle}>
                            <div style={topLineStyle}>{this.state.characterOneName} and {this.state.characterTwoName} have met {fight.numFaceOffs} times:</div>
                            <hr />
                            <div style={percentageStyle}>{this.state.characterOneName}'s win percentage: {charOnePercentage}%</div>
                            <div style={percentageStyle}>{this.state.characterTwoName}'s win percentage: {charTwoPercentage}%</div>
                        </div>
                    )
                }
            } else {
                return (<div style={pStyle}>{this.state.errorMessage}</div>)
            }
        }

        render() {
            return (
                <div style={pageStyle}>

                    <Table style={tableStyle} sorted={this.state.sortedField}>
                        <thead>
                            <tr>
                                <th style={nameStyle}>Name</th>
                                <th style={voteStyle}>Votes </th>
                                <th style={winStyle}>Win %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </Table>

                    <div style={formStyle}>
                        <Form onSubmit={this.handleSubmit}>
                            <p style={pStyle}> Enter the names of two characters to view the stats between them: </p>
                            <br />
                            <input placeholder="First Character" style={inputStyle} onChange={(e) => this.setState({ characterOneName: e.target.value })}></input>
                            <p style={pStyle}> vs. </p>
                            <input placeholder="Second Character" style={inputStyle} onChange={(e) => this.setState({ characterTwoName: e.target.value })}></input>

                            <br />
                            <Button style={buttonStyle} type="submit">Submit</Button>

                            {this.showStatistics()}
                        </Form>
                    </div>
                    <div style={emptyStyle}></div>
                </div>
            )
        }

        componentDidMount() {
            this.getCharacters()
            this.createTable()
        }
    }

export default RatingsTable