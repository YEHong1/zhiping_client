import React, {Component} from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Main from "./Pages/Main/Main";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route component={Main}/>
                </Switch>
            </HashRouter>
        )
    }
}