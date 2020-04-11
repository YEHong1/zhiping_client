import React, {Component} from 'react';
import {Button} from "antd-mobile";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Button type='primary'>Hello</Button>
        )
    }
}