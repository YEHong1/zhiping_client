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
    goLogin = ()=>{
        const {username, password} = this.state;
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
                        <Button type='primary' onClick={this.register} >登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace/>
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
