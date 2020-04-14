import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import BossInfo from "../BossInfo/BossInfo";
import JobHunterInfo from "../JobHunterInfo/JobHunterInfo";
import {connect} from 'react-redux';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {header, type, msg} = this.props.user;
        // 有头像信息代表用户信息已经完善了，可以跳转到对应的用户界面
        if(header){
            let path = '';
            if(type === 'boss'){
                path = '/boss'
            }else {
                path = '/jobHunter'
            }
            return <Redirect to={path}/>
        }else if(msg){
            return <Redirect to='/login'/>
        }

        return (
            <div>
                <Switch>
                    <Route path='/bossInfo' component={BossInfo}/>
                    <Route path='/jobHunterInfo' component={JobHunterInfo}/>
                </Switch>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user})
)(Main);