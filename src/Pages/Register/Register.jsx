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
    Button,
    Modal
} from 'antd-mobile'
import Logo from "../../Componments/logo/logo";

const ListItem = List.Item;

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordAgain: '',
            type: 'jobHunter', // jobHunter(求职者) / boss(老板)
            showModal: false, // 控制弹窗的显示与隐藏
            errorText: '', // 弹窗显示的错误文本
        }
    }

    // 控制弹窗的显示与隐藏
    changeModalStatus = (flag) => {
        this.setState({
            showModal: flag
        })
    };

    // 更新用户输入的数据
    handleChange = (name, value)=>{
        this.setState({
            [name]: value
        })
    };

    // 去注册
    register = ()=>{
        const {username, password, passwordAgain, type} = this.state;

        if(!username || !password || !passwordAgain){
            this.setState({
                errorText: '用户名、密码不能为空！'
            }, ()=>{
                this.changeModalStatus(true);
            });
            return;
        }

        if(password !== passwordAgain){
            this.setState({
                errorText: '两次输入的密码不一致'
            }, ()=>{
                this.changeModalStatus(true);
            });
            // return
        }


    };

    // 跳转到登录界面
    goLogin = ()=>{
        this.props.history.push('/login');
    };


    render() {
        const {type, showModal, errorText} = this.state;
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem className='label' placeholder='请输入用户名' onChange={value => {
                            this.handleChange('username', value);
                        }}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem className='label' placeholder='请输入密码' type="password" onChange={value => {
                            this.handleChange('password', value);
                        }}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace/>
                        <InputItem className='label' placeholder='请输入确认密码' type="password" onChange={value => {
                            this.handleChange('passwordAgain', value);
                        }}>确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型:</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='jobHunter'} onChange={() => {
                                this.handleChange('type', 'jobHunter');
                            }}>&nbsp;应聘者</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='boss'} onChange={() => {
                                this.handleChange('type', 'boss');
                            }}>&nbsp;招聘者</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register} >注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.goLogin} >已有账户</Button>
                    </List>
                </WingBlank>

                {/*错误提示弹窗*/}
                <Modal
                    visible={showModal}
                    transparent
                    maskClosable={true}
                    animationType='fade'
                    onClose={()=>{this.changeModalStatus(false)}}
                    title="提示"
                    footer={[{ text: '知道了', onPress: () => {this.changeModalStatus(false)} }]}
                >
                    <p>{errorText}</p>
                </Modal>

            </div>
        )
    }
}
