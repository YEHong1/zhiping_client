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
import {errorMsg, register} from "../../redux/actionCreator";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const ListItem = List.Item;

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordAgain: '',
            type: 'jobHunter', // jobHunter(求职者) / boss(老板)
        }
    }

    // 更新用户输入的数据
    handleChange = (name, value)=>{
        this.setState({
            [name]: value
        })
    };

    // 去注册
    goRegister = async ()=>{
        const {username, password, passwordAgain, type} = this.state;
        this.props.register({username, password, passwordAgain, type});
    };

    // 跳转到登录界面
    goLogin = ()=>{
        this.props.history.push('/login');
    };


    render() {
        const {type} = this.state;
        const {msg, redireactPath} = this.props.user;
        if(redireactPath){
            return <Redirect to={redireactPath}/>
        }

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
                        <Button type='primary' onClick={this.goRegister} >注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.goLogin} >已有账户</Button>
                    </List>
                </WingBlank>

                {/*错误提示弹窗*/}
                {msg !== undefined ?
                <Modal
                    visible={msg}
                    transparent
                    maskClosable={true}
                    animationType='up'
                    onClose={()=>{this.props.errorMsg(undefined);}}
                    title="提示"
                    footer={[{ text: '知道了', onPress: () => {
                            this.props.errorMsg(undefined);
                        } }]}
                >
                    <p>{msg}</p>
                </Modal> : null}


            </div>
        )
    }
}

Register.propTypes = {
    errorMsg: PropTypes.func,
    register: PropTypes.func,
};

export default connect(
    state => ({user: state.user}),
    {errorMsg, register}
)(Register);
