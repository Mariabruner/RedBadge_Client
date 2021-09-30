import React, { FunctionComponent, MouseEventHandler, ReactElement, ReactNode } from 'react'
import {
    Table
} from 'reactstrap'
import { JsxElement } from 'typescript'


type props = {

}

type state = {
    accessToken: string | null,
    characterData: character[]
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
}

const nameStyle = {
    "width": "50%",
    "border": "1px solid #1D3557",
    "text-align": "left"
}

const voteStyle = {
    "width": "20%",
    "border": "1px solid #1D3557"
}

const winStyle = {
    "width": "30%",
    "border": "1px solid #1D3557"
}

class RatingsTable extends React.Component<props, state> {
    constructor(props: props) {
        super(props)

        this.state = {
            accessToken: localStorage.getItem("token"),
            characterData: []
        }
    }

    getCharacters = () => {
        fetch(`http://localhost:3000/character/`, {
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


    createTable = () : ReactNode  => {
        

        let list: ReactElement[] = []

        list = this.state.characterData.map(function (item: character) {
            let winPercentage = ((item.votes/item.fightAppearances) * 100).toFixed(2)
                  
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

    render() {
        return (
            <div style={pageStyle}>
                <Table style={tableStyle}>
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
            </div>
        )
    }

    componentDidMount() {
        this.getCharacters()
        this.createTable()
    }
}

export default RatingsTable