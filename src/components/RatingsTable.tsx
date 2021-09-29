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
            let winPercentage = item.votes/item.fightAppearances
            return (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.votes}</td>
                    <td>{winPercentage}</td>
                </tr>
            )
        })

        return list

    }

    render() {
        return (
            <div>
                RATINGS TABLE PAGE
                <Table>
                    <thead>
                        <tr>
                            <th>Character</th>
                            <th>Votes </th>
                            <th>Win %</th>
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