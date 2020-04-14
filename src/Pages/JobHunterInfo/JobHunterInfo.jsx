import React, {Component} from 'react';
import {Button, InputItem, NavBar, TextareaItem} from "antd-mobile";
import {connect} from 'react-redux';
import {updateUser} from "../../redux/actionCreator";
import AvatarSelect from "../../Componments/AvatarSelect/AvatarSelect";
import {Redirect} from "react-router-dom";

class JobHunterInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: '', // 头像
            post: '',   // 岗位
            info: '',   // 介绍
        };
    }

    setheader = (header)=>{
        this.setState({
            header
        });
    };

    handleChange = (name, value)=>{
        this.setState({
            [name]: value
        })
    };

    save = ()=>{
        this.props.updateUser(this.state);
    };

    render() {

        const {header, type} = this.props.user;
        //如果header有值，说明用户信息已经完善了
        if(header){
            const path = type === 'boss' ? '/boss' : '/jobHunter';
            return <Redirect to={path}/>
        }

        return (
            <div>
                <NavBar>信息完善</NavBar>
                <AvatarSelect setheader={this.setheader}/>
                <InputItem placeholder='请输入求职岗位' onChange={(value)=>{this.handleChange('post', value)}}>求职岗位:</InputItem>
                <TextareaItem title="个人介绍:"
                              placeholder='请输入个人介绍'
                              rows={3}
                              onChange={(value)=>{this.handleChange('info', value)}}
                />
                <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(JobHunterInfo);