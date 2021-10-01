import React, { MouseEventHandler } from 'react'
import { Route, Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import {
    Navbar,
    NavLink,
    NavbarBrand,
    Button
} from 'reactstrap'

import Auth from '../auth/Auth'
import FaceOff from './FaceOff'
import RatingsTable from './RatingsTable'
import NewCharacter from './NewCharacter'

type props = {
    clickLogout(): void
    updateToken(sessionToken: string): void
}

type state = {
    
}

const barStyle = {
    "backgroundColor": "#E63946",
    "display": "flex",
    "justifyContent": "left",
    "height": "7vh",
    "font-family":  "Hammersmith One"
}

const NavLinkStyle = {
    "marginLeft": "10px",
    "align-self": "center",
    "justify-self": "left"
}

const linkStyle = {
    "color": "#F1FAEE",
    "text-decoration": "none"
}

const buttonStyle = {
    "height": "4vh",
    "align-self": "center",
    "color": "#1D3557",
    "backgroundColor": "#F1FAEE",
    "border": "solid 2px #F1FAEE",
    "borderRadius": "10px",
    "font-family": "Hammersmith One",
}

class Sitebar extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {

        }
    }



    render() {
        return (
            <div>
            <Navbar style={barStyle}>
                    <NavLink style={NavLinkStyle}><Link style={linkStyle} to="/">Home</Link></NavLink>
                    <NavLink style={NavLinkStyle}><Link style={linkStyle} to="/ratingstable">Stats</Link></NavLink>
                    <NavLink style={NavLinkStyle}><Link style={linkStyle} to="/newcharacter"></Link></NavLink>
                    <Button style = {buttonStyle} onClick={this.props.clickLogout}>Logout</Button>
            </Navbar>

            <Switch>
                <Route exact path="/auth"><Auth updateToken={this.props.updateToken}/></Route>
                <Route exact path="/faceoff"><FaceOff /></Route>
                <Route exact path="/"><FaceOff /></Route>
                <Route exact path="/ratingstable"><RatingsTable /></Route>
                <Route exact path="/newcharacter"><NewCharacter /></Route>
            </Switch>
            </div>
        )
    }
}

export default Sitebar