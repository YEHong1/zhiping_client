import React, {Component} from 'react';
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {resetUser} from "../../redux/actionCreator";

const Item = List.Item;
const Brief = Item.Brief;

class Mine extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    logout = () => {
        Modal.alert('退出', '是否确定退出?', [
            {
                text: '确定',
                onPress: () => {
                    // 删除cookie中的userid
                    Cookies.remove('userid');
                    // 清除redux中的user数据
                    this.props.resetUser();
                }
            },
            {
                text: '取消',
                onPress: () => {

                }
            },
        ])
    };


    render() {
        const {username, info, header, company, post, salary} = this.props.user

        return (
            <div style={{marginBottom: 60, marginTop: 50}}>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} alt="header"/>}
                    title={username}
                    message={company}
                />

                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary ? <Brief>薪资: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Mine);