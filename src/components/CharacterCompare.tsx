
import React, { FunctionComponent, MouseEventHandler, ReactElement, ReactNode } from 'react'
import { isPropertySignature } from 'typescript'


import APIURL from '../helpers/environment'


type props = {

}

type state = {
    accessToken: string | null,
}

class characterCompare extends React.Component<props, state> {
    constructor(props: props) {
        super(props)

        this.state = {
            accessToken: localStorage.getItem("token"),
        }
    }

    render () {
        return(
            <div>Hello</div>
        )
    }
}

export default characterCompare