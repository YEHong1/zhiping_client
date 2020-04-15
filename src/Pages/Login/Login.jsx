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
    Button,
    Modal
} from 'antd-mobile'
import Logo from "../../Componments/logo/logo";
import {errorMsg, login} from "../../redux/actionCreator";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    // 更新用户输入的数据
    handleChange = (name, value)=>{
        this.setState({
            [name]: value
        })
    };

    // 跳转到登录界面
    goLogin = ()=>{
        this.props.login(this.state);
    };


    render() {
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
                        <Button type='primary' onClick={this.goLogin} >登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace/>
                        <Button onClick={()=>{this.props.history.replace('/register')}} >还没有账号</Button>
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

Login.propTypes = {
    errorMsg: PropTypes.func,
    login: PropTypes.func,
};

export default connect(
    state => ({user: state.user}),
    {errorMsg, login}
)(Login);
