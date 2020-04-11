/*
注册的路由组件
 */
import React, {Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import Logo from "../../Componments/logo/logo";

const ListItem = List.Item;

export default class Register extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem className='label' placeholder='请输入用户名'>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem className='label' placeholder='请输入密码' type="password">密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace/>
                        <InputItem className='label' placeholder='请输入确认密码' type="password">确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型:</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio>&nbsp;应聘者</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio>&nbsp;招聘者</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' >注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button >已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
