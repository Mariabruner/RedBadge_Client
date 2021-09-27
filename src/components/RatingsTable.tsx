import React, { MouseEventHandler } from 'react'
import {
    Table
} from 'reactstrap'


type props = {

}

type state = {
    accessToken: string | null
}

class RatingsTable extends React.Component<props, state> {
    constructor(props: props) {
        super(props)

        this.state = {
            accessToken: localStorage.getItem("token"),
        }
    }

    getCharacters = () => {
        fetch( `http://localhost:3000/character/`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.accessToken}`
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

    render() {
        return (
            <div>
                RATINGS TABLE PAGE
                <Table>
                    <thead>
                        <tr>
                            <th>Ranking</th>
                            <th>Character</th>
                            <th>Win %</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Marlee</td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Angel</td>
                            <td>0%</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }

    componentDidMount() {
        this.getCharacters()
    }
}

export default RatingsTable