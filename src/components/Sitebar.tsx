import React, { MouseEventHandler } from 'react'
import { Route, Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavLink,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap'

import Auth from '../auth/Auth'
import FaceOff from './FaceOff'
import RatingsTable from './RatingsTable'

type props = {
    updateToken(sessionToken: string): void
}

type state = {
    
}

const barStyle = {
    "backgroundColor": "#E63946"
}

class Sitebar extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {

        }
    }

    clearToken = () => {
          localStorage.clear()
          this.props.updateToken("")
    }

    render() {
        console.log(this.props.updateToken)
        return (
            <div>
            <Navbar style={barStyle}>
                <Button onClick={this.clearToken}>Logout</Button>
                <NavItem>
                    <NavLink><Link to="/auth">Login/Signup</Link></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink><Link to="/faceoff">FaceOff</Link></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink><Link to="/ratingstable">Ratings Table</Link></NavLink>
                </NavItem>
            </Navbar>

            <Switch>
                <Route exact path="/auth"><Auth updateToken={this.props.updateToken}/></Route>
                <Route exact path="/faceoff"><FaceOff /></Route>
                <Route exact path="/ratingstable"><RatingsTable /></Route>
            </Switch>
            </div>
        )
    }
}

export default Sitebar