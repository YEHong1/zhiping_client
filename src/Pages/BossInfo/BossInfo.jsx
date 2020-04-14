import React, {Component} from 'react';
import {InputItem, NavBar, TextareaItem, Button} from "antd-mobile";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {updateUser} from "../../redux/actionCreator";
import AvatarSelect from "../../Componments/AvatarSelect/AvatarSelect";

class BossInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: '', // 头像
            post: '',   // 岗位
            info: '',   // 介绍
            company: '',// 公司
            salary: '', // 薪资
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
                <NavBar>老板信息完善</NavBar>
                <AvatarSelect setheader={this.setheader}/>
                <InputItem placeholder='请输入招聘职位' onChange={(value)=>{this.handleChange('post', value)}}>招聘职位:</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={(value)=>{this.handleChange('company', value)}}>公司名称:</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={(value)=>{this.handleChange('salary', value)}}>职位薪资:</InputItem>
                <TextareaItem title="职位要求:"
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
)(BossInfo);